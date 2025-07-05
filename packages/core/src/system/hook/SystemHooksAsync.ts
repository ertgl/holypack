import type { ResolveConfigHookAsync } from "../../context/configurator/hooks/ResolveConfigHookAsync";
import type { SYSTEM_HOOK_UID_RESOLVE_CONFIG_ASYNC } from "../../context/configurator/hooks/SYSTEM_HOOK_UID_RESOLVE_CONFIG_ASYNC";
import type { AugmentContextHookAsync } from "../../hooks/augment-context/AugmentContextHookAsync";
import type { SYSTEM_HOOK_UID_AUGMENT_CONTEXT_ASYNC } from "../../hooks/augment-context/SYSTEM_HOOK_UID_AUGMENT_CONTEXT_ASYNC";
import type { PostBindContextHookHookAsync } from "../../hooks/post-bind-context-hook/PostBindContextHookHookAsync";
import type { SYSTEM_HOOK_UID_POST_BIND_CONTEXT_HOOK_ASYNC } from "../../hooks/post-bind-context-hook/SYSTEM_HOOK_UID_POST_BIND_CONTEXT_HOOK_ASYNC";
import type { PostBindExtensionHookHookAsync } from "../../hooks/post-bind-extension-hook/PostBindExtensionHookHookAsync";
import type { SYSTEM_HOOK_UID_POST_BIND_EXTENSION_HOOK_ASYNC } from "../../hooks/post-bind-extension-hook/SYSTEM_HOOK_UID_POST_BIND_EXTENSION_HOOK_ASYNC";
import type { PostBindExtensionHookAsync } from "../../hooks/post-bind-extension/PostBindExtensionHookAsync";
import type { SYSTEM_HOOK_UID_POST_BIND_EXTENSION_ASYNC } from "../../hooks/post-bind-extension/SYSTEM_HOOK_UID_POST_BIND_EXTENSION_ASYNC";
import type { PostResolveContextHookAsync } from "../../hooks/post-resolve-context/PostResolveContextHookAsync";
import type { SYSTEM_HOOK_UID_POST_RESOLVE_CONTEXT_ASYNC } from "../../hooks/post-resolve-context/SYSTEM_HOOK_UID_POST_RESOLVE_CONTEXT_ASYNC";
import type { PostSealContextHookAsync } from "../../hooks/post-seal-context/PostSealContextHookAsync";
import type { SYSTEM_HOOK_UID_POST_SEAL_CONTEXT_ASYNC } from "../../hooks/post-seal-context/SYSTEM_HOOK_UID_POST_SEAL_CONTEXT_ASYNC";
import type { ResolveContextHookAsync } from "../../hooks/resolve-context/ResolveContextHookAsync";
import type { SYSTEM_HOOK_UID_RESOLVE_CONTEXT_ASYNC } from "../../hooks/resolve-context/SYSTEM_HOOK_UID_RESOLVE_CONTEXT_ASYNC";
import type { SealContextHookAsync } from "../../hooks/seal-context/SealContextHookAsync";
import type { SYSTEM_HOOK_UID_SEAL_CONTEXT_ASYNC } from "../../hooks/seal-context/SYSTEM_HOOK_UID_SEAL_CONTEXT_ASYNC";
import type { SetupHookAsync } from "../../hooks/setup/SetupHookAsync";
import type { SYSTEM_HOOK_UID_SETUP_ASYNC } from "../../hooks/setup/SYSTEM_HOOK_UID_SETUP_ASYNC";

export type SystemHooksAsync = {
  /* eslint-disable perfectionist/sort-object-types */
  [SYSTEM_HOOK_UID_POST_BIND_CONTEXT_HOOK_ASYNC]: PostBindContextHookHookAsync;
  [SYSTEM_HOOK_UID_POST_BIND_EXTENSION_ASYNC]: PostBindExtensionHookAsync;
  [SYSTEM_HOOK_UID_POST_BIND_EXTENSION_HOOK_ASYNC]: PostBindExtensionHookHookAsync;
  [SYSTEM_HOOK_UID_RESOLVE_CONFIG_ASYNC]: ResolveConfigHookAsync;
  [SYSTEM_HOOK_UID_AUGMENT_CONTEXT_ASYNC]: AugmentContextHookAsync;
  [SYSTEM_HOOK_UID_SETUP_ASYNC]: SetupHookAsync;
  [SYSTEM_HOOK_UID_RESOLVE_CONTEXT_ASYNC]: ResolveContextHookAsync;
  [SYSTEM_HOOK_UID_POST_RESOLVE_CONTEXT_ASYNC]: PostResolveContextHookAsync;
  [SYSTEM_HOOK_UID_SEAL_CONTEXT_ASYNC]: SealContextHookAsync;
  [SYSTEM_HOOK_UID_POST_SEAL_CONTEXT_ASYNC]: PostSealContextHookAsync;
  /* eslint-enable perfectionist/sort-object-types */
};
