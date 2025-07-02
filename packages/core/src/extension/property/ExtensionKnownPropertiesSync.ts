import type { ResolveConfigHookSync } from "../../context/configurator/hooks/ResolveConfigHookSync";
import type { HookCallbackSync } from "../../hook/callback/HookCallbackSync";
import type { AugmentContextHookSync } from "../../hooks/augment-context/AugmentContextHookSync";
import type { PostBindContextHookHookSync } from "../../hooks/post-bind-context-hook/PostBindContextHookHookSync";
import type { PostBindExtensionHookHookSync } from "../../hooks/post-bind-extension-hook/PostBindExtensionHookHookSync";
import type { PostBindExtensionHookSync } from "../../hooks/post-bind-extension/PostBindExtensionHookSync";
import type { PostResolveContextHookSync } from "../../hooks/post-resolve-context/PostResolveContextHookSync";
import type { PostSealContextHookSync } from "../../hooks/post-seal-context/PostSealContextHookSync";
import type { ResolveContextHookSync } from "../../hooks/resolve-context/ResolveContextHookSync";
import type { SealContextHookSync } from "../../hooks/seal-context/SealContextHookSync";
import type { SetupHookSync } from "../../hooks/setup/SetupHookSync";
import type { Optional } from "../../lib/object/Optional";
import type { ExtensionInitializerSync } from "../initializer/ExtensionInitializerSync";

import type { ExtensionKnownPropertiesBase } from "./ExtensionKnownPropertiesBase";

export type ExtensionKnownPropertiesSync = (
  & ExtensionKnownPropertiesBase
  & {
    $augmentContextSync?: Optional<HookCallbackSync<AugmentContextHookSync>>;
    $initializeSync?: Optional<ExtensionInitializerSync>;
    $postBindContextHookSync?: Optional<HookCallbackSync<PostBindContextHookHookSync>>;
    $postBindExtensionHookSync?: Optional<HookCallbackSync<PostBindExtensionHookHookSync>>;
    $postBindExtensionSync?: Optional<HookCallbackSync<PostBindExtensionHookSync>>;
    $postResolveContextSync?: Optional<HookCallbackSync<PostResolveContextHookSync>>;
    $postSealContextSync?: Optional<HookCallbackSync<PostSealContextHookSync>>;
    $resolveConfigSync?: Optional<HookCallbackSync<ResolveConfigHookSync>>;
    $resolveContextSync?: Optional<HookCallbackSync<ResolveContextHookSync>>;
    $sealContextSync?: Optional<HookCallbackSync<SealContextHookSync>>;
    $setupSync?: Optional<HookCallbackSync<SetupHookSync>>;
  }
);
