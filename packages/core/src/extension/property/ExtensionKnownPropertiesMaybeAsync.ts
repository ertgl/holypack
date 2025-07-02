import type { ResolveConfigHookAsync } from "../../context/configurator/hooks/ResolveConfigHookAsync";
import type { HookCallbackMaybeAsync } from "../../hook/callback/HookCallbackMaybeAsync";
import type { AugmentContextHookAsync } from "../../hooks/augment-context/AugmentContextHookAsync";
import type { PostBindContextHookHookAsync } from "../../hooks/post-bind-context-hook/PostBindContextHookHookAsync";
import type { PostBindExtensionHookHookAsync } from "../../hooks/post-bind-extension-hook/PostBindExtensionHookHookAsync";
import type { PostBindExtensionHookAsync } from "../../hooks/post-bind-extension/PostBindExtensionHookAsync";
import type { PostResolveContextHookAsync } from "../../hooks/post-resolve-context/PostResolveContextHookAsync";
import type { PostSealContextHookAsync } from "../../hooks/post-seal-context/PostSealContextHookAsync";
import type { ResolveContextHookAsync } from "../../hooks/resolve-context/ResolveContextHookAsync";
import type { SealContextHookAsync } from "../../hooks/seal-context/SealContextHookAsync";
import type { SetupHookAsync } from "../../hooks/setup/SetupHookAsync";
import type { Optional } from "../../lib/object/Optional";
import type { ExtensionInitializerMaybeAsync } from "../initializer/ExtensionInitializerMaybeAsync";

import type { ExtensionKnownPropertiesBase } from "./ExtensionKnownPropertiesBase";

export type ExtensionKnownPropertiesMaybeAsync = (
  & ExtensionKnownPropertiesBase
  & {
    $augmentContext?: Optional<HookCallbackMaybeAsync<AugmentContextHookAsync>>;
    $initialize?: Optional<ExtensionInitializerMaybeAsync>;
    $postBindContextHook?: Optional<HookCallbackMaybeAsync<PostBindContextHookHookAsync>>;
    $postBindExtension?: Optional<HookCallbackMaybeAsync<PostBindExtensionHookAsync>>;
    $postBindExtensionHook?: Optional<HookCallbackMaybeAsync<PostBindExtensionHookHookAsync>>;
    $postResolveContext?: Optional<HookCallbackMaybeAsync<PostResolveContextHookAsync>>;
    $postSealContext?: Optional<HookCallbackMaybeAsync<PostSealContextHookAsync>>;
    $resolveConfig?: Optional<HookCallbackMaybeAsync<ResolveConfigHookAsync>>;
    $resolveContext?: Optional<HookCallbackMaybeAsync<ResolveContextHookAsync>>;
    $sealContext?: Optional<HookCallbackMaybeAsync<SealContextHookAsync>>;
    $setup?: Optional<HookCallbackMaybeAsync<SetupHookAsync>>;
  }
);
