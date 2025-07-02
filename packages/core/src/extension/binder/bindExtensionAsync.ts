import type { ContextAsync } from "../../context/ContextAsync";
import { SYSTEM_HOOK_UID_POST_BIND_EXTENSION_ASYNC } from "../../hooks/post-bind-extension/SYSTEM_HOOK_UID_POST_BIND_EXTENSION_ASYNC";
import { maybeSubscribeExtensionToSystemHooksAsync } from "../../system/extension/binder/hook/maybeSubscribeExtensionToSystemHooksAsync";
import { useSystemHookAsync } from "../../system/hook/interop/useSystemHookAsync";
import type { ExtensionMaybeAsync } from "../ExtensionMaybeAsync";
import { initializeExtensionAsync } from "../initializer/initializeExtensionAsync";
import { validateExtensionUID } from "../uid/validateExtensionUID";

import { ExtensionIsAlreadyBoundError } from "./errors/ExtensionIsAlreadyBoundError";

export async function bindExtensionAsync(
  context: ContextAsync,
  extension: ExtensionMaybeAsync,
): Promise<void>
{
  validateExtensionUID(
    extension.$uid,
    extension,
  );

  if (context.extensions.has(extension.$uid))
  {
    throw new ExtensionIsAlreadyBoundError(extension);
  }

  maybeSubscribeExtensionToSystemHooksAsync(
    context,
    extension,
  );

  context.extensions.set(
    extension.$uid,
    extension,
  );

  await initializeExtensionAsync(
    context,
    extension,
  );

  await useSystemHookAsync(
    context,
    SYSTEM_HOOK_UID_POST_BIND_EXTENSION_ASYNC,
    async (
      hook,
    ) =>
    {
      await hook.promise(
        context,
        extension,
      );
    },
  );
}
