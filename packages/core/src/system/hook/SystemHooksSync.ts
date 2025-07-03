import type { ResolveConfigHookSync } from "../../context/configurator/hooks/ResolveConfigHookSync";
import type { SYSTEM_HOOK_UID_RESOLVE_CONFIG_SYNC } from "../../context/configurator/hooks/SYSTEM_HOOK_UID_RESOLVE_CONFIG_SYNC";
import type { AugmentContextHookSync } from "../../hooks/augment-context/AugmentContextHookSync";
import type { SYSTEM_HOOK_UID_AUGMENT_CONTEXT_SYNC } from "../../hooks/augment-context/SYSTEM_HOOK_UID_AUGMENT_CONTEXT_SYNC";
import type { PostBindContextCommandHookSync } from "../../hooks/post-bind-context-command/PostBindContextCommandHookSync";
import type { SYSTEM_HOOK_UID_POST_BIND_CONTEXT_COMMAND_SYNC } from "../../hooks/post-bind-context-command/SYSTEM_HOOK_UID_POST_BIND_CONTEXT_COMMAND_SYNC";
import type { PostBindContextHookHookSync } from "../../hooks/post-bind-context-hook/PostBindContextHookHookSync";
import type { SYSTEM_HOOK_UID_POST_BIND_CONTEXT_HOOK_SYNC } from "../../hooks/post-bind-context-hook/SYSTEM_HOOK_UID_POST_BIND_CONTEXT_HOOK_SYNC";
import type { PostBindExtensionHookHookSync } from "../../hooks/post-bind-extension-hook/PostBindExtensionHookHookSync";
import type { SYSTEM_HOOK_UID_POST_BIND_EXTENSION_HOOK_SYNC } from "../../hooks/post-bind-extension-hook/SYSTEM_HOOK_UID_POST_BIND_EXTENSION_HOOK_SYNC";
import type { PostBindExtensionHookSync } from "../../hooks/post-bind-extension/PostBindExtensionHookSync";
import type { SYSTEM_HOOK_UID_POST_BIND_EXTENSION_SYNC } from "../../hooks/post-bind-extension/SYSTEM_HOOK_UID_POST_BIND_EXTENSION_SYNC";
import type { PostResolveContextHookSync } from "../../hooks/post-resolve-context/PostResolveContextHookSync";
import type { SYSTEM_HOOK_UID_POST_RESOLVE_CONTEXT_SYNC } from "../../hooks/post-resolve-context/SYSTEM_HOOK_UID_POST_RESOLVE_CONTEXT_SYNC";
import type { PostSealContextHookSync } from "../../hooks/post-seal-context/PostSealContextHookSync";
import type { SYSTEM_HOOK_UID_POST_SEAL_CONTEXT_SYNC } from "../../hooks/post-seal-context/SYSTEM_HOOK_UID_POST_SEAL_CONTEXT_SYNC";
import type { ResolveContextHookSync } from "../../hooks/resolve-context/ResolveContextHookSync";
import type { SYSTEM_HOOK_UID_RESOLVE_CONTEXT_SYNC } from "../../hooks/resolve-context/SYSTEM_HOOK_UID_RESOLVE_CONTEXT_SYNC";
import type { SealContextHookSync } from "../../hooks/seal-context/SealContextHookSync";
import type { SYSTEM_HOOK_UID_SEAL_CONTEXT_SYNC } from "../../hooks/seal-context/SYSTEM_HOOK_UID_SEAL_CONTEXT_SYNC";
import type { SetupHookSync } from "../../hooks/setup/SetupHookSync";
import type { SYSTEM_HOOK_UID_SETUP_SYNC } from "../../hooks/setup/SYSTEM_HOOK_UID_SETUP_SYNC";

export type SystemHooksSync = {
  /* eslint-disable perfectionist/sort-object-types */
  [SYSTEM_HOOK_UID_POST_BIND_CONTEXT_HOOK_SYNC]: PostBindContextHookHookSync;
  [SYSTEM_HOOK_UID_POST_BIND_CONTEXT_COMMAND_SYNC]: PostBindContextCommandHookSync;
  [SYSTEM_HOOK_UID_POST_BIND_EXTENSION_SYNC]: PostBindExtensionHookSync;
  [SYSTEM_HOOK_UID_POST_BIND_EXTENSION_HOOK_SYNC]: PostBindExtensionHookHookSync;
  [SYSTEM_HOOK_UID_RESOLVE_CONFIG_SYNC]: ResolveConfigHookSync;
  [SYSTEM_HOOK_UID_AUGMENT_CONTEXT_SYNC]: AugmentContextHookSync;
  [SYSTEM_HOOK_UID_SETUP_SYNC]: SetupHookSync;
  [SYSTEM_HOOK_UID_RESOLVE_CONTEXT_SYNC]: ResolveContextHookSync;
  [SYSTEM_HOOK_UID_POST_RESOLVE_CONTEXT_SYNC]: PostResolveContextHookSync;
  [SYSTEM_HOOK_UID_SEAL_CONTEXT_SYNC]: SealContextHookSync;
  [SYSTEM_HOOK_UID_POST_SEAL_CONTEXT_SYNC]: PostSealContextHookSync;
  /* eslint-enable perfectionist/sort-object-types */
};
