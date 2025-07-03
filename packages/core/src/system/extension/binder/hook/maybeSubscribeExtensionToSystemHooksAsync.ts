import { SYSTEM_HOOK_UID_RESOLVE_CONFIG_ASYNC } from "../../../../context/configurator/hooks/SYSTEM_HOOK_UID_RESOLVE_CONFIG_ASYNC";
import type { ContextAsync } from "../../../../context/ContextAsync";
import { maybeSubscribeExtensionToHookAsync } from "../../../../extension/binder/hook/maybeSubscribeExtensionToHookAsync";
import type { ExtensionMaybeAsync } from "../../../../extension/ExtensionMaybeAsync";
import type { ExtensionSync } from "../../../../extension/ExtensionSync";
import { SYSTEM_HOOK_UID_AUGMENT_CONTEXT_ASYNC } from "../../../../hooks/augment-context/SYSTEM_HOOK_UID_AUGMENT_CONTEXT_ASYNC";
import { SYSTEM_HOOK_UID_POST_BIND_CONTEXT_COMMAND_ASYNC } from "../../../../hooks/post-bind-context-command/SYSTEM_HOOK_UID_POST_BIND_CONTEXT_COMMAND_ASYNC";
import { SYSTEM_HOOK_UID_POST_BIND_CONTEXT_HOOK_ASYNC } from "../../../../hooks/post-bind-context-hook/SYSTEM_HOOK_UID_POST_BIND_CONTEXT_HOOK_ASYNC";
import { SYSTEM_HOOK_UID_POST_BIND_EXTENSION_HOOK_ASYNC } from "../../../../hooks/post-bind-extension-hook/SYSTEM_HOOK_UID_POST_BIND_EXTENSION_HOOK_ASYNC";
import { SYSTEM_HOOK_UID_POST_BIND_EXTENSION_ASYNC } from "../../../../hooks/post-bind-extension/SYSTEM_HOOK_UID_POST_BIND_EXTENSION_ASYNC";
import { SYSTEM_HOOK_UID_POST_RESOLVE_CONTEXT_ASYNC } from "../../../../hooks/post-resolve-context/SYSTEM_HOOK_UID_POST_RESOLVE_CONTEXT_ASYNC";
import { SYSTEM_HOOK_UID_POST_SEAL_CONTEXT_ASYNC } from "../../../../hooks/post-seal-context/SYSTEM_HOOK_UID_POST_SEAL_CONTEXT_ASYNC";
import { SYSTEM_HOOK_UID_RESOLVE_CONTEXT_ASYNC } from "../../../../hooks/resolve-context/SYSTEM_HOOK_UID_RESOLVE_CONTEXT_ASYNC";
import { SYSTEM_HOOK_UID_SEAL_CONTEXT_ASYNC } from "../../../../hooks/seal-context/SYSTEM_HOOK_UID_SEAL_CONTEXT_ASYNC";
import { SYSTEM_HOOK_UID_SETUP_ASYNC } from "../../../../hooks/setup/SYSTEM_HOOK_UID_SETUP_ASYNC";
import { requireSystemHook } from "../../../hook/registry/requireSystemHook";
import type { SystemHooksAsync } from "../../../hook/SystemHooksAsync";
import type { SystemHookUIDAsync } from "../../../hook/uid/SystemHookUIDAsync";

export function maybeSubscribeExtensionToSystemHooksAsync(
  context: ContextAsync,
  extension: ExtensionSync,
): SystemHooksAsync
{
  return {
    /* eslint-disable perfectionist/sort-objects */
    [SYSTEM_HOOK_UID_POST_BIND_CONTEXT_HOOK_ASYNC]: subscribeAndReturnHook(
      context,
      SYSTEM_HOOK_UID_POST_BIND_CONTEXT_HOOK_ASYNC,
      extension,
      "$postBindContextHook",
    ),
    [SYSTEM_HOOK_UID_POST_BIND_CONTEXT_COMMAND_ASYNC]: subscribeAndReturnHook(
      context,
      SYSTEM_HOOK_UID_POST_BIND_CONTEXT_COMMAND_ASYNC,
      extension,
      "$postBindContextCommand",
    ),
    [SYSTEM_HOOK_UID_POST_BIND_EXTENSION_ASYNC]: subscribeAndReturnHook(
      context,
      SYSTEM_HOOK_UID_POST_BIND_EXTENSION_ASYNC,
      extension,
      "$postBindExtension",
    ),
    [SYSTEM_HOOK_UID_POST_BIND_EXTENSION_HOOK_ASYNC]: subscribeAndReturnHook(
      context,
      SYSTEM_HOOK_UID_POST_BIND_EXTENSION_HOOK_ASYNC,
      extension,
      "$postBindExtensionHook",
    ),
    [SYSTEM_HOOK_UID_RESOLVE_CONFIG_ASYNC]: subscribeAndReturnHook(
      context,
      SYSTEM_HOOK_UID_RESOLVE_CONFIG_ASYNC,
      extension,
      "$resolveConfig",
    ),
    [SYSTEM_HOOK_UID_AUGMENT_CONTEXT_ASYNC]: subscribeAndReturnHook(
      context,
      SYSTEM_HOOK_UID_AUGMENT_CONTEXT_ASYNC,
      extension,
      "$augmentContext",
    ),
    [SYSTEM_HOOK_UID_SETUP_ASYNC]: subscribeAndReturnHook(
      context,
      SYSTEM_HOOK_UID_SETUP_ASYNC,
      extension,
      "$setup",
    ),
    [SYSTEM_HOOK_UID_RESOLVE_CONTEXT_ASYNC]: subscribeAndReturnHook(
      context,
      SYSTEM_HOOK_UID_RESOLVE_CONTEXT_ASYNC,
      extension,
      "$resolveContext",
    ),
    [SYSTEM_HOOK_UID_POST_RESOLVE_CONTEXT_ASYNC]: subscribeAndReturnHook(
      context,
      SYSTEM_HOOK_UID_POST_RESOLVE_CONTEXT_ASYNC,
      extension,
      "$postResolveContext",
    ),
    [SYSTEM_HOOK_UID_SEAL_CONTEXT_ASYNC]: subscribeAndReturnHook(
      context,
      SYSTEM_HOOK_UID_SEAL_CONTEXT_ASYNC,
      extension,
      "$sealContext",
    ),
    [SYSTEM_HOOK_UID_POST_SEAL_CONTEXT_ASYNC]: subscribeAndReturnHook(
      context,
      SYSTEM_HOOK_UID_POST_SEAL_CONTEXT_ASYNC,
      extension,
      "$postSealContext",
    ),
    /* eslint-enable perfectionist/sort-objects */
  };
}

function subscribeAndReturnHook<
  T_HookUID extends SystemHookUIDAsync = SystemHookUIDAsync,
>(
  context: ContextAsync,
  hookUID: T_HookUID,
  extension: ExtensionMaybeAsync,
  methodName: string,
): SystemHooksAsync[T_HookUID]
{
  const hook = requireSystemHook(
    context,
    hookUID,
  );

  maybeSubscribeExtensionToHookAsync(
    hook,
    extension,
    methodName,
  );

  return hook;
}
