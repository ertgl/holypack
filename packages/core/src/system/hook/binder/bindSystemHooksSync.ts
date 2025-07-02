import { createResolveConfigHookSync } from "../../../context/configurator/hooks/createResolveConfigHookSync";
import { SYSTEM_HOOK_UID_RESOLVE_CONFIG_SYNC } from "../../../context/configurator/hooks/SYSTEM_HOOK_UID_RESOLVE_CONFIG_SYNC";
import type { ContextSync } from "../../../context/ContextSync";
import type { AnyHookSync } from "../../../hook/AnyHookSync";
import { bindHookSync } from "../../../hook/binder/bindHookSync";
import { createAugmentContextHookSync } from "../../../hooks/augment-context/createAugmentContextHookSync";
import { SYSTEM_HOOK_UID_AUGMENT_CONTEXT_SYNC } from "../../../hooks/augment-context/SYSTEM_HOOK_UID_AUGMENT_CONTEXT_SYNC";
import { createPostBindContextHookHookSync } from "../../../hooks/post-bind-context-hook/createPostBindContextHookHookSync";
import { SYSTEM_HOOK_UID_POST_BIND_CONTEXT_HOOK_SYNC } from "../../../hooks/post-bind-context-hook/SYSTEM_HOOK_UID_POST_BIND_CONTEXT_HOOK_SYNC";
import { createPostBindExtensionHookHookSync } from "../../../hooks/post-bind-extension-hook/createPostBindExtensionHookHookSync";
import { SYSTEM_HOOK_UID_POST_BIND_EXTENSION_HOOK_SYNC } from "../../../hooks/post-bind-extension-hook/SYSTEM_HOOK_UID_POST_BIND_EXTENSION_HOOK_SYNC";
import { createPostBindExtensionHookSync } from "../../../hooks/post-bind-extension/createPostBindExtensionHookSync";
import { SYSTEM_HOOK_UID_POST_BIND_EXTENSION_SYNC } from "../../../hooks/post-bind-extension/SYSTEM_HOOK_UID_POST_BIND_EXTENSION_SYNC";
import { createPostResolveContextHookSync } from "../../../hooks/post-resolve-context/createResolveContextHookSync";
import { SYSTEM_HOOK_UID_POST_RESOLVE_CONTEXT_SYNC } from "../../../hooks/post-resolve-context/SYSTEM_HOOK_UID_POST_RESOLVE_CONTEXT_SYNC";
import { createPostSealContextHookSync } from "../../../hooks/post-seal-context/createSealContextHookSync";
import { SYSTEM_HOOK_UID_POST_SEAL_CONTEXT_SYNC } from "../../../hooks/post-seal-context/SYSTEM_HOOK_UID_POST_SEAL_CONTEXT_SYNC";
import { createResolveContextHookSync } from "../../../hooks/resolve-context/createResolveContextHookSync";
import { SYSTEM_HOOK_UID_RESOLVE_CONTEXT_SYNC } from "../../../hooks/resolve-context/SYSTEM_HOOK_UID_RESOLVE_CONTEXT_SYNC";
import { createSealContextHookSync } from "../../../hooks/seal-context/createSealContextHookSync";
import { SYSTEM_HOOK_UID_SEAL_CONTEXT_SYNC } from "../../../hooks/seal-context/SYSTEM_HOOK_UID_SEAL_CONTEXT_SYNC";
import { createSetupHookSync } from "../../../hooks/setup/createSetupHookSync";
import { SYSTEM_HOOK_UID_SETUP_SYNC } from "../../../hooks/setup/SYSTEM_HOOK_UID_SETUP_SYNC";
import type { SystemHooksSync } from "../SystemHooksSync";

export function bindSystemHooksSync(
  context: ContextSync,
): SystemHooksSync
{
  return {
    /* eslint-disable perfectionist/sort-objects */
    [SYSTEM_HOOK_UID_POST_BIND_CONTEXT_HOOK_SYNC]: bindAndReturnHook(
      context,
      createPostBindContextHookHookSync(),
    ),
    [SYSTEM_HOOK_UID_POST_BIND_EXTENSION_SYNC]: bindAndReturnHook(
      context,
      createPostBindExtensionHookSync(),
    ),
    [SYSTEM_HOOK_UID_POST_BIND_EXTENSION_HOOK_SYNC]: bindAndReturnHook(
      context,
      createPostBindExtensionHookHookSync(),
    ),
    [SYSTEM_HOOK_UID_RESOLVE_CONFIG_SYNC]: bindAndReturnHook(
      context,
      createResolveConfigHookSync(),
    ),
    [SYSTEM_HOOK_UID_AUGMENT_CONTEXT_SYNC]: bindAndReturnHook(
      context,
      createAugmentContextHookSync(),
    ),
    [SYSTEM_HOOK_UID_SETUP_SYNC]: bindAndReturnHook(
      context,
      createSetupHookSync(),
    ),
    [SYSTEM_HOOK_UID_RESOLVE_CONTEXT_SYNC]: bindAndReturnHook(
      context,
      createResolveContextHookSync(),
    ),
    [SYSTEM_HOOK_UID_POST_RESOLVE_CONTEXT_SYNC]: bindAndReturnHook(
      context,
      createPostResolveContextHookSync(),
    ),
    [SYSTEM_HOOK_UID_SEAL_CONTEXT_SYNC]: bindAndReturnHook(
      context,
      createSealContextHookSync(),
    ),
    [SYSTEM_HOOK_UID_POST_SEAL_CONTEXT_SYNC]: bindAndReturnHook(
      context,
      createPostSealContextHookSync(),
    ),
    /* eslint-enable perfectionist/sort-objects */
  };
}

function bindAndReturnHook<
  T_Hook extends AnyHookSync,
>(
  context: ContextSync,
  hook: T_Hook,
): T_Hook
{
  bindHookSync(
    context,
    hook,
  );

  return hook;
}
