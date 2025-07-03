import type { ConfigAsync } from "../../config/ConfigAsync";
import { SYSTEM_HOOK_UID_AUGMENT_CONTEXT_ASYNC } from "../../hooks/augment-context/SYSTEM_HOOK_UID_AUGMENT_CONTEXT_ASYNC";
import { SYSTEM_HOOK_UID_POST_RESOLVE_CONTEXT_ASYNC } from "../../hooks/post-resolve-context/SYSTEM_HOOK_UID_POST_RESOLVE_CONTEXT_ASYNC";
import { SYSTEM_HOOK_UID_RESOLVE_CONTEXT_ASYNC } from "../../hooks/resolve-context/SYSTEM_HOOK_UID_RESOLVE_CONTEXT_ASYNC";
import { SYSTEM_HOOK_UID_SETUP_ASYNC } from "../../hooks/setup/SYSTEM_HOOK_UID_SETUP_ASYNC";
import { createMutex } from "../../lib/mutex/createMutex";
import type { Optional } from "../../lib/object/Optional";
import { resolveCWD } from "../../lib/process/cwd/resolveCWD";
import { bindSystemExtensionsAsync } from "../../system/extension/binder/bindSystemExtensionsAsync";
import { bindSystemHooksAsync } from "../../system/hook/binder/bindSystemHooksAsync";
import { useSystemHookAsync } from "../../system/hook/interop/useSystemHookAsync";
import { configureContextAsync } from "../configurator/configureContextAsync";
import { configureContextByFileAsync } from "../configurator/configureContextByFileAsync";
import { SYSTEM_HOOK_UID_RESOLVE_CONFIG_ASYNC } from "../configurator/hooks/SYSTEM_HOOK_UID_RESOLVE_CONFIG_ASYNC";
import type { ContextAsync } from "../ContextAsync";

import type { ContextResolutionOptionsAsync } from "./ContextResolutionOptionsAsync";

export async function resolveContextAsync(
  options?: Optional<ContextResolutionOptionsAsync>,
): Promise<ContextAsync>
{
  options ??= {};

  const cwd = resolveCWD(options.cwd);

  const context: ContextAsync = {
    cwd,
    extensions: new Map(),
    fs: {},
    hooks: new Map(),
    sealed: false,
    sealerMutex: createMutex(),
    sync: false,
  };

  const bindSystemHooks = (
    options.systemHooksBinder
    ?? bindSystemHooksAsync
  );

  await bindSystemHooks(context);

  const configs: ConfigAsync[] = [];

  if (options.preConfig != null)
  {
    configs.push(
      await configureContextAsync(
        context,
        options.preConfig,
      ),
    );
  }

  if (options.loadConfigFile ?? true)
  {
    const configByFile = await configureContextByFileAsync(
      context,
      {
        configDefinitionLoaderOptions: options.configDefinitionLoaderOptions,
        configFilePathFinderOptions: options.configFilePathFinderOptions,
        cwd,
      },
    );

    if (configByFile != null)
    {
      configs.push(configByFile);
    }
  }

  if (options.config != null)
  {
    configs.push(
      await configureContextAsync(
        context,
        options.config,
      ),
    );
  }

  if (options.postConfig != null)
  {
    configs.push(
      await configureContextAsync(
        context,
        options.postConfig,
      ),
    );
  }

  if (configs.length === 0)
  {
    configs.push(
      await configureContextAsync(
        context,
        null,
      ),
    );
  }

  const bindSystemExtensions = (
    options.systemExtensionsBinder
    ?? bindSystemExtensionsAsync
  );

  await bindSystemExtensions(context);

  for (const config of configs)
  {
    await useSystemHookAsync(
      context,
      SYSTEM_HOOK_UID_RESOLVE_CONFIG_ASYNC,
      async (hook) =>
      {
        await hook.promise(
          context,
          config,
        );
      },
    );
  }

  await useSystemHookAsync(
    context,
    SYSTEM_HOOK_UID_AUGMENT_CONTEXT_ASYNC,
    async (hook) =>
    {
      await hook.promise(context);
    },
  );

  await useSystemHookAsync(
    context,
    SYSTEM_HOOK_UID_SETUP_ASYNC,
    async (hook) =>
    {
      await hook.promise(context);
    },
  );

  await useSystemHookAsync(
    context,
    SYSTEM_HOOK_UID_RESOLVE_CONTEXT_ASYNC,
    async (hook) =>
    {
      await hook.promise(context);
    },
  );

  await useSystemHookAsync(
    context,
    SYSTEM_HOOK_UID_POST_RESOLVE_CONTEXT_ASYNC,
    async (hook) =>
    {
      await hook.promise(context);
    },
  );

  return context;
}
