import type { ConfigAsync } from "../config/ConfigAsync";
import type { ConfigSync } from "../config/ConfigSync";
import type { ContextAsync } from "../context/ContextAsync";
import type { ContextSync } from "../context/ContextSync";
import type { AnyHook } from "../hook/AnyHook";
import type { AnyHookSync } from "../hook/AnyHookSync";
import type { HookRegistry } from "../hook/registry/HookRegistry";

import type { Extension } from "./Extension";
import type { ExtensionMaybeAsync } from "./ExtensionMaybeAsync";
import type { ExtensionSync } from "./ExtensionSync";

export abstract class AbstractExtension
implements
    ExtensionMaybeAsync,
    ExtensionSync
{
  [key: string]: unknown;

  $hooks: HookRegistry;

  abstract $uid: string;

  constructor()
  {
    this.$hooks = new Map();
  }

  $augmentContext?(
    context: ContextAsync,
  ): Promise<void> | void;

  $augmentContextSync?(
    context: ContextSync,
  ): void;

  $initialize?(
    context: ContextAsync,
  ): Promise<void> | void;

  $initializeSync?(
    context: ContextSync,
  ): void;

  $postBindContextHook?(
    context: ContextAsync,
    hook: AnyHook,
  ): Promise<void> | void;

  $postBindContextHookSync?(
    context: ContextSync,
    hook: AnyHookSync,
  ): void;

  $postBindExtension?(
    context: ContextAsync,
    extension: Extension,
  ): Promise<void> | void;

  $postBindExtensionHook?(
    context: ContextAsync,
    extension: Extension,
    hook: AnyHook,
  ): Promise<void> | void;

  $postBindExtensionHookSync?(
    context: ContextSync,
    extension: Extension,
    hook: AnyHookSync,
  ): void;

  $postBindExtensionSync?(
    context: ContextSync,
    extension: Extension,
  ): void;

  $postResolveContext?(
    context: ContextAsync,
  ): Promise<void> | void;

  $postResolveContextSync?(
    context: ContextSync,
  ): void;

  $postSealContext?(
    context: ContextAsync,
  ): Promise<void> | void;

  $postSealContextSync?(
    context: ContextSync,
  ): void;

  $resolveConfig?(
    context: ContextAsync,
    config: ConfigAsync,
  ): Promise<void> | void;

  $resolveConfigSync?(
    context: ContextSync,
    config: ConfigSync,
  ): void;

  $resolveContext?(
    context: ContextAsync,
  ): Promise<void> | void;

  $resolveContextSync?(
    context: ContextSync,
  ): void;

  $sealContext?(
    context: ContextAsync,
  ): Promise<void> | void;

  $sealContextSync?(
    context: ContextSync,
  ): void;

  $setup?(
    context: ContextAsync,
  ): Promise<void> | void;

  $setupSync?(
    context: ContextSync,
  ): void;
}
