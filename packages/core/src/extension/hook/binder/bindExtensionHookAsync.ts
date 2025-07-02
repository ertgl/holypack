import type { ContextAsync } from "../../../context/ContextAsync";
import type { AnyHook } from "../../../hook/AnyHook";
import { validateHookUID } from "../../../hook/uid/validateHookUID";
import { SYSTEM_HOOK_UID_POST_BIND_EXTENSION_HOOK_ASYNC } from "../../../hooks/post-bind-extension-hook/SYSTEM_HOOK_UID_POST_BIND_EXTENSION_HOOK_ASYNC";
import { useSystemHookAsync } from "../../../system/hook/interop/useSystemHookAsync";
import type { Extension } from "../../Extension";

import { ExtensionHasNoHookRegistryError } from "./errors/ExtensionHasNoHookRegistryError";
import { ExtensionHookIsAlreadyBoundError } from "./errors/ExtensionHookIsAlreadyBoundError";

export async function bindExtensionHookAsync(
  context: ContextAsync,
  extension: Extension,
  hook: AnyHook,
): Promise<void>
{
  if (extension.$hooks == null)
  {
    throw new ExtensionHasNoHookRegistryError(extension);
  }

  validateHookUID(
    hook.name,
    hook,
  );

  if (extension.$hooks.has(hook.name))
  {
    throw new ExtensionHookIsAlreadyBoundError(
      extension,
      hook,
    );
  }

  extension.$hooks.set(
    hook.name,
    hook,
  );

  await useSystemHookAsync(
    context,
    SYSTEM_HOOK_UID_POST_BIND_EXTENSION_HOOK_ASYNC,
    async (postBindExtensionHookHook) =>
    {
      await postBindExtensionHookHook.promise(
        context,
        extension,
        hook,
      );
    },
  );
}
