import type { ContextAsync } from "@holypack/core/context/ContextAsync";
import type { ContextSync } from "@holypack/core/context/ContextSync";
import { AbstractExtension } from "@holypack/core/extension/AbstractExtension";
import type { Extension } from "@holypack/core/extension/Extension";
import { maybeBindExtensionHookAsync } from "@holypack/core/extension/hook/binder/maybeBindExtensionHookAsync";
import { maybeBindExtensionHookSync } from "@holypack/core/extension/hook/binder/maybeBindExtensionHookSync";
import { maybeUseExtensionHookAsync } from "@holypack/core/extension/hook/interop/maybeUseExtensionHookAsync";
import { maybeUseExtensionHookSync } from "@holypack/core/extension/hook/interop/maybeUseExtensionHookSync";
import { useExtensionHookAsync } from "@holypack/core/extension/hook/interop/useExtensionHookAsync";
import { useExtensionHookSync } from "@holypack/core/extension/hook/interop/useExtensionHookSync";
import { maybeAwait } from "@holypack/core/lib/promise/maybeAwait";

import { CLI_HOOK_UID_SETUP_CLI_ASYNC } from "../hooks/setup-cli/CLI_HOOK_UID_SETUP_CLI_ASYNC";
import { CLI_HOOK_UID_SETUP_CLI_SYNC } from "../hooks/setup-cli/CLI_HOOK_UID_SETUP_CLI_SYNC";
import { createSetupCLIHookAsync } from "../hooks/setup-cli/createSetupCLIHookAsync";
import { createSetupCLIHookSync } from "../hooks/setup-cli/createSetupCLIHookSync";
import type { SetupCLIHookAsync } from "../hooks/setup-cli/SetupCLIHookAsync";
import type { SetupCLIHookSync } from "../hooks/setup-cli/SetupCLIHookSync";
import type { Program } from "../program/Program";
import type { CLIExtensionProtocol } from "../protocol/CLIExtensionProtocol";
import { doesExtensionImplementCLIProtocol } from "../protocol/doesExtensionImplementCLIProtocol";

import { EXTENSION_UID_CLI } from "./EXTENSION_UID_CLI";

export class CLIExtension extends AbstractExtension
{
  readonly $uid = EXTENSION_UID_CLI;

  readonly extensionQueueForSetupHookSubscription: Set<CLIExtensionProtocol & Extension>;

  readonly program: Program;

  constructor(
    program: Program,
  )
  {
    super();

    this.program = program;

    this.extensionQueueForSetupHookSubscription = new Set();
  }

  $initialize(
    context: ContextAsync,
  ): void
  {
    for (const extension of context.extensions.values())
    {
      if (doesExtensionImplementCLIProtocol(extension))
      {
        this.extensionQueueForSetupHookSubscription.add(extension);
      }
    }
  }

  $initializeSync(
    context: ContextSync,
  ): void
  {
    for (const extension of context.extensions.values())
    {
      if (doesExtensionImplementCLIProtocol(extension))
      {
        this.extensionQueueForSetupHookSubscription.add(extension);
      }
    }
  }

  async $postBindExtension(
    context: ContextAsync,
    extension: Extension,
  ): Promise<void>
  {
    if (doesExtensionImplementCLIProtocol(extension))
    {
      await maybeUseExtensionHookAsync<SetupCLIHookAsync>(
        this,
        CLI_HOOK_UID_SETUP_CLI_ASYNC,
        (hook) =>
        {
          this.createHookSubscriptionForSetupAsync(
            hook,
            extension,
          );
        },
        () =>
        {
          this.extensionQueueForSetupHookSubscription.add(extension);
        },
      );
    }
  }

  $postBindExtensionSync(
    context: ContextSync,
    extension: Extension,
  ): void
  {
    if (doesExtensionImplementCLIProtocol(extension))
    {
      maybeUseExtensionHookSync<SetupCLIHookSync>(
        this,
        CLI_HOOK_UID_SETUP_CLI_SYNC,
        (hook) =>
        {
          this.createHookSubscriptionForSetupSync(
            hook,
            extension,
          );
        },
        () =>
        {
          this.extensionQueueForSetupHookSubscription.add(extension);
        },
      );
    }
  }

  async $setup(
    context: ContextAsync,
  ): Promise<void>
  {
    await maybeBindExtensionHookAsync(
      context,
      this,
      createSetupCLIHookAsync(),
    );

    await this.makePostponedExtensionsSubscribeToSetupHookAsync();
  }

  $setupSync(
    context: ContextSync,
  ): void
  {
    maybeBindExtensionHookSync(
      context,
      this,
      createSetupCLIHookSync(),
    );

    this.makePostponedExtensionsSubscribeToSetupHookSync();
  }

  createHookSubscriptionForSetupAsync(
    hook: SetupCLIHookAsync,
    extension: CLIExtensionProtocol & Extension,
  ): void
  {
    hook.tapPromise(
      {
        name: extension.$uid,
      },
      async (
        context,
        program,
      ) =>
      {
        return await maybeAwait(
          extension.$setupCLI?.(
            context,
            program,
          ),
        );
      },
    );
  }

  createHookSubscriptionForSetupSync(
    hook: SetupCLIHookSync,
    extension: CLIExtensionProtocol & Extension,
  ): void
  {
    hook.tap(
      {
        name: extension.$uid,
      },
      (
        context,
        program,
      ) =>
      {
        return extension.$setupCLISync?.(
          context,
          program,
        );
      },
    );
  }

  async makeExtensionSubscribeToSetupHookAsync(
    extension: CLIExtensionProtocol & Extension,
  ): Promise<void>
  {
    await useExtensionHookAsync<SetupCLIHookAsync>(
      this,
      CLI_HOOK_UID_SETUP_CLI_ASYNC,
      (hook) =>
      {
        this.createHookSubscriptionForSetupAsync(
          hook,
          extension,
        );
      },
    );
  }

  makeExtensionSubscribeToSetupHookSync(
    extension: CLIExtensionProtocol & Extension,
  ): void
  {
    useExtensionHookSync<SetupCLIHookSync>(
      this,
      CLI_HOOK_UID_SETUP_CLI_SYNC,
      (hook) =>
      {
        this.createHookSubscriptionForSetupSync(
          hook,
          extension,
        );
      },
    );
  }

  async makePostponedExtensionsSubscribeToSetupHookAsync(): Promise<void>
  {
    const extensions = Array.from(this.extensionQueueForSetupHookSubscription);

    for (const extension of extensions)
    {
      await this.makeExtensionSubscribeToSetupHookAsync(extension);
      this.extensionQueueForSetupHookSubscription.delete(extension);
    }
  }

  makePostponedExtensionsSubscribeToSetupHookSync(): void
  {
    const extensions = Array.from(this.extensionQueueForSetupHookSubscription);

    for (const extension of extensions)
    {
      this.makeExtensionSubscribeToSetupHookSync(extension);
      this.extensionQueueForSetupHookSubscription.delete(extension);
    }
  }

  async setup(
    context: ContextAsync,
  ): Promise<void>
  {
    await useExtensionHookAsync<SetupCLIHookAsync>(
      this,
      CLI_HOOK_UID_SETUP_CLI_ASYNC,
      async (hook) =>
      {
        await hook.promise(
          context,
          this.program,
        );
      },
    );
  }

  setupSync(
    context: ContextSync,
  ): void
  {
    useExtensionHookSync<SetupCLIHookSync>(
      this,
      CLI_HOOK_UID_SETUP_CLI_SYNC,
      (hook) =>
      {
        hook.call(
          context,
          this.program,
        );
      },
    );
  }
}
