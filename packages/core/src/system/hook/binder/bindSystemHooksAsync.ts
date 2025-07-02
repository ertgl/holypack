import { createResolveConfigHookAsync } from "../../../context/configurator/hooks/createResolveConfigHookAsync";
import { SYSTEM_HOOK_UID_RESOLVE_CONFIG_ASYNC } from "../../../context/configurator/hooks/SYSTEM_HOOK_UID_RESOLVE_CONFIG_ASYNC";
import type { ContextAsync } from "../../../context/ContextAsync";
import type { AnyHookAsync } from "../../../hook/AnyHookAsync";
import { bindHookAsync } from "../../../hook/binder/bindHookAsync";
import { createAugmentContextHookAsync } from "../../../hooks/augment-context/createAugmentContextHookAsync";
import { SYSTEM_HOOK_UID_AUGMENT_CONTEXT_ASYNC } from "../../../hooks/augment-context/SYSTEM_HOOK_UID_AUGMENT_CONTEXT_ASYNC";
import { createPostBindContextHookHookAsync } from "../../../hooks/post-bind-context-hook/createPostBindContextHookHookAsync";
import { SYSTEM_HOOK_UID_POST_BIND_CONTEXT_HOOK_ASYNC } from "../../../hooks/post-bind-context-hook/SYSTEM_HOOK_UID_POST_BIND_CONTEXT_HOOK_ASYNC";
import { createPostBindExtensionHookHookAsync } from "../../../hooks/post-bind-extension-hook/createPostBindExtensionHookHookAsync";
import { SYSTEM_HOOK_UID_POST_BIND_EXTENSION_HOOK_ASYNC } from "../../../hooks/post-bind-extension-hook/SYSTEM_HOOK_UID_POST_BIND_EXTENSION_HOOK_ASYNC";
import { createPostBindExtensionHookAsync } from "../../../hooks/post-bind-extension/createPostBindExtensionHookAsync";
import { SYSTEM_HOOK_UID_POST_BIND_EXTENSION_ASYNC } from "../../../hooks/post-bind-extension/SYSTEM_HOOK_UID_POST_BIND_EXTENSION_ASYNC";
import { createPostResolveContextHookAsync } from "../../../hooks/post-resolve-context/createPostResolveContextHookAsync";
import { SYSTEM_HOOK_UID_POST_RESOLVE_CONTEXT_ASYNC } from "../../../hooks/post-resolve-context/SYSTEM_HOOK_UID_POST_RESOLVE_CONTEXT_ASYNC";
import { createPostSealContextHookAsync } from "../../../hooks/post-seal-context/createPostSealContextHookAsync";
import { SYSTEM_HOOK_UID_POST_SEAL_CONTEXT_ASYNC } from "../../../hooks/post-seal-context/SYSTEM_HOOK_UID_POST_SEAL_CONTEXT_ASYNC";
import { createResolveContextHookAsync } from "../../../hooks/resolve-context/createResolveContextHookAsync";
import { SYSTEM_HOOK_UID_RESOLVE_CONTEXT_ASYNC } from "../../../hooks/resolve-context/SYSTEM_HOOK_UID_RESOLVE_CONTEXT_ASYNC";
import { createSealContextHookAsync } from "../../../hooks/seal-context/createSealContextHookAsync";
import { SYSTEM_HOOK_UID_SEAL_CONTEXT_ASYNC } from "../../../hooks/seal-context/SYSTEM_HOOK_UID_SEAL_CONTEXT_ASYNC";
import { createSetupHookAsync } from "../../../hooks/setup/createSetupHookAsync";
import { SYSTEM_HOOK_UID_SETUP_ASYNC } from "../../../hooks/setup/SYSTEM_HOOK_UID_SETUP_ASYNC";
import type { SystemHooksAsync } from "../SystemHooksAsync";

export async function bindSystemHooksAsync(
  context: ContextAsync,
): Promise<SystemHooksAsync>
{
  return {
    /* eslint-disable perfectionist/sort-objects */
    [SYSTEM_HOOK_UID_POST_BIND_CONTEXT_HOOK_ASYNC]: await bindAndReturnHook(
      context,
      createPostBindContextHookHookAsync(),
    ),
    [SYSTEM_HOOK_UID_POST_BIND_EXTENSION_ASYNC]: await bindAndReturnHook(
      context,
      createPostBindExtensionHookAsync(),
    ),
    [SYSTEM_HOOK_UID_POST_BIND_EXTENSION_HOOK_ASYNC]: await bindAndReturnHook(
      context,
      createPostBindExtensionHookHookAsync(),
    ),
    [SYSTEM_HOOK_UID_RESOLVE_CONFIG_ASYNC]: await bindAndReturnHook(
      context,
      createResolveConfigHookAsync(),
    ),
    [SYSTEM_HOOK_UID_AUGMENT_CONTEXT_ASYNC]: await bindAndReturnHook(
      context,
      createAugmentContextHookAsync(),
    ),
    [SYSTEM_HOOK_UID_SETUP_ASYNC]: await bindAndReturnHook(
      context,
      createSetupHookAsync(),
    ),
    [SYSTEM_HOOK_UID_RESOLVE_CONTEXT_ASYNC]: await bindAndReturnHook(
      context,
      createResolveContextHookAsync(),
    ),
    [SYSTEM_HOOK_UID_POST_RESOLVE_CONTEXT_ASYNC]: await bindAndReturnHook(
      context,
      createPostResolveContextHookAsync(),
    ),
    [SYSTEM_HOOK_UID_SEAL_CONTEXT_ASYNC]: await bindAndReturnHook(
      context,
      createSealContextHookAsync(),
    ),
    [SYSTEM_HOOK_UID_POST_SEAL_CONTEXT_ASYNC]: await bindAndReturnHook(
      context,
      createPostSealContextHookAsync(),
    ),
    /* eslint-enable perfectionist/sort-objects */
  };
}

async function bindAndReturnHook<
  T_Hook extends AnyHookAsync,
>(
  context: ContextAsync,
  hook: T_Hook,
): Promise<T_Hook>
{
  await bindHookAsync(
    context,
    hook,
  );

  return hook;
}
