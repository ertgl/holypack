import type { ContextSync } from "../../../context/ContextSync";
import type { AnyHookSync } from "../../../hook/AnyHookSync";
import { validateHookUID } from "../../../hook/uid/validateHookUID";
import { SYSTEM_HOOK_UID_POST_BIND_EXTENSION_HOOK_SYNC } from "../../../hooks/post-bind-extension-hook/SYSTEM_HOOK_UID_POST_BIND_EXTENSION_HOOK_SYNC";
import { useSystemHookSync } from "../../../system/hook/interop/useSystemHookSync";
import type { Extension } from "../../Extension";

import { ExtensionHasNoHookRegistryError } from "./errors/ExtensionHasNoHookRegistryError";
import { ExtensionHookIsAlreadyBoundError } from "./errors/ExtensionHookIsAlreadyBoundError";

export function bindExtensionHookSync(
  context: ContextSync,
  extension: Extension,
  hook: AnyHookSync,
): void
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

  useSystemHookSync(
    context,
    SYSTEM_HOOK_UID_POST_BIND_EXTENSION_HOOK_SYNC,
    (postBindExtensionHookHook) =>
    {
      postBindExtensionHookHook.call(
        context,
        extension,
        hook,
      );
    },
  );
}
