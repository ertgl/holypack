import { SYSTEM_HOOK_UID_RESOLVE_CONFIG_SYNC } from "../../../../context/configurator/hooks/SYSTEM_HOOK_UID_RESOLVE_CONFIG_SYNC";
import type { ContextSync } from "../../../../context/ContextSync";
import { maybeSubscribeExtensionToHookSync } from "../../../../extension/binder/hook/maybeSubscribeExtensionToHookSync";
import type { ExtensionSync } from "../../../../extension/ExtensionSync";
import { SYSTEM_HOOK_UID_AUGMENT_CONTEXT_SYNC } from "../../../../hooks/augment-context/SYSTEM_HOOK_UID_AUGMENT_CONTEXT_SYNC";
import { SYSTEM_HOOK_UID_POST_BIND_CONTEXT_HOOK_SYNC } from "../../../../hooks/post-bind-context-hook/SYSTEM_HOOK_UID_POST_BIND_CONTEXT_HOOK_SYNC";
import { SYSTEM_HOOK_UID_POST_BIND_EXTENSION_HOOK_SYNC } from "../../../../hooks/post-bind-extension-hook/SYSTEM_HOOK_UID_POST_BIND_EXTENSION_HOOK_SYNC";
import { SYSTEM_HOOK_UID_POST_BIND_EXTENSION_SYNC } from "../../../../hooks/post-bind-extension/SYSTEM_HOOK_UID_POST_BIND_EXTENSION_SYNC";
import { SYSTEM_HOOK_UID_POST_RESOLVE_CONTEXT_SYNC } from "../../../../hooks/post-resolve-context/SYSTEM_HOOK_UID_POST_RESOLVE_CONTEXT_SYNC";
import { SYSTEM_HOOK_UID_POST_SEAL_CONTEXT_SYNC } from "../../../../hooks/post-seal-context/SYSTEM_HOOK_UID_POST_SEAL_CONTEXT_SYNC";
import { SYSTEM_HOOK_UID_RESOLVE_CONTEXT_SYNC } from "../../../../hooks/resolve-context/SYSTEM_HOOK_UID_RESOLVE_CONTEXT_SYNC";
import { SYSTEM_HOOK_UID_SEAL_CONTEXT_SYNC } from "../../../../hooks/seal-context/SYSTEM_HOOK_UID_SEAL_CONTEXT_SYNC";
import { SYSTEM_HOOK_UID_SETUP_SYNC } from "../../../../hooks/setup/SYSTEM_HOOK_UID_SETUP_SYNC";
import { requireSystemHook } from "../../../hook/registry/requireSystemHook";
import type { SystemHooksSync } from "../../../hook/SystemHooksSync";
import type { SystemHookUIDSync } from "../../../hook/uid/SystemHookUIDSync";

export function maybeSubscribeExtensionToSystemHooksSync(
  context: ContextSync,
  extension: ExtensionSync,
): SystemHooksSync
{
  return {
    /* eslint-disable perfectionist/sort-objects */
    [SYSTEM_HOOK_UID_POST_BIND_CONTEXT_HOOK_SYNC]: subscribeAndReturnHook(
      context,
      SYSTEM_HOOK_UID_POST_BIND_CONTEXT_HOOK_SYNC,
      extension,
      "$postBindContextHookSync",
    ),
    [SYSTEM_HOOK_UID_POST_BIND_EXTENSION_SYNC]: subscribeAndReturnHook(
      context,
      SYSTEM_HOOK_UID_POST_BIND_EXTENSION_SYNC,
      extension,
      "$postBindExtensionSync",
    ),
    [SYSTEM_HOOK_UID_POST_BIND_EXTENSION_HOOK_SYNC]: subscribeAndReturnHook(
      context,
      SYSTEM_HOOK_UID_POST_BIND_EXTENSION_HOOK_SYNC,
      extension,
      "$postBindExtensionHookSync",
    ),
    [SYSTEM_HOOK_UID_RESOLVE_CONFIG_SYNC]: subscribeAndReturnHook(
      context,
      SYSTEM_HOOK_UID_RESOLVE_CONFIG_SYNC,
      extension,
      "$resolveConfigSync",
    ),
    [SYSTEM_HOOK_UID_AUGMENT_CONTEXT_SYNC]: subscribeAndReturnHook(
      context,
      SYSTEM_HOOK_UID_AUGMENT_CONTEXT_SYNC,
      extension,
      "$augmentContextSync",
    ),
    [SYSTEM_HOOK_UID_SETUP_SYNC]: subscribeAndReturnHook(
      context,
      SYSTEM_HOOK_UID_SETUP_SYNC,
      extension,
      "$setupSync",
    ),
    [SYSTEM_HOOK_UID_RESOLVE_CONTEXT_SYNC]: subscribeAndReturnHook(
      context,
      SYSTEM_HOOK_UID_RESOLVE_CONTEXT_SYNC,
      extension,
      "$resolveContextSync",
    ),
    [SYSTEM_HOOK_UID_POST_RESOLVE_CONTEXT_SYNC]: subscribeAndReturnHook(
      context,
      SYSTEM_HOOK_UID_POST_RESOLVE_CONTEXT_SYNC,
      extension,
      "$postResolveContextSync",
    ),
    [SYSTEM_HOOK_UID_SEAL_CONTEXT_SYNC]: subscribeAndReturnHook(
      context,
      SYSTEM_HOOK_UID_SEAL_CONTEXT_SYNC,
      extension,
      "$sealContextSync",
    ),
    [SYSTEM_HOOK_UID_POST_SEAL_CONTEXT_SYNC]: subscribeAndReturnHook(
      context,
      SYSTEM_HOOK_UID_POST_SEAL_CONTEXT_SYNC,
      extension,
      "$postSealContextSync",
    ),
    /* eslint-enable perfectionist/sort-objects */
  };
}

function subscribeAndReturnHook<
  T_HookUID extends SystemHookUIDSync = SystemHookUIDSync,
>(
  context: ContextSync,
  hookUID: T_HookUID,
  extension: ExtensionSync,
  methodName: string,
): SystemHooksSync[T_HookUID]
{
  const hook = requireSystemHook(
    context,
    hookUID,
  );

  maybeSubscribeExtensionToHookSync(
    hook,
    extension,
    methodName,
  );

  return hook;
}
