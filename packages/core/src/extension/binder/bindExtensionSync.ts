import type { ContextSync } from "../../context/ContextSync";
import { SYSTEM_HOOK_UID_POST_BIND_EXTENSION_SYNC } from "../../hooks/post-bind-extension/SYSTEM_HOOK_UID_POST_BIND_EXTENSION_SYNC";
import { maybeSubscribeExtensionToSystemHooksSync } from "../../system/extension/binder/hook/maybeSubscribeExtensionToSystemHooksSync";
import { useSystemHookSync } from "../../system/hook/interop/useSystemHookSync";
import type { ExtensionSync } from "../ExtensionSync";
import { initializeExtensionSync } from "../initializer/initializeExtensionSync";
import { validateExtensionUID } from "../uid/validateExtensionUID";

import { ExtensionIsAlreadyBoundError } from "./errors/ExtensionIsAlreadyBoundError";

export function bindExtensionSync(
  context: ContextSync,
  extension: ExtensionSync,
): void
{
  validateExtensionUID(
    extension.$uid,
    extension,
  );

  if (context.extensions.has(extension.$uid))
  {
    throw new ExtensionIsAlreadyBoundError(extension);
  }

  maybeSubscribeExtensionToSystemHooksSync(
    context,
    extension,
  );

  context.extensions.set(
    extension.$uid,
    extension,
  );

  initializeExtensionSync(
    context,
    extension,
  );

  useSystemHookSync(
    context,
    SYSTEM_HOOK_UID_POST_BIND_EXTENSION_SYNC,
    (
      hook,
    ) =>
    {
      hook.call(
        context,
        extension,
      );
    },
  );
}
