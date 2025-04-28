import type { TypeSafeConfig } from "../config";
import type {
  Context,
  ContextResolutionOptions,
  TypeSafeContext,
} from "../context";
import type {
  HookSubscriptionID,
  KnownHook,
} from "../eventing";

export interface Plugin
{
  generateHookSubscriptionID?: (
    hook: KnownHook,
  ) => HookSubscriptionID;

  name: PluginName;

  onContextReady?: (
    context: Context,
  ) => Promise<void> | void;

  resolveConfig?: (
    context: TypeSafeContext,
    config: TypeSafeConfig,
  ) => Promise<void> | void;

  resolveContext?: (
    context: TypeSafeContext,
    options: ContextResolutionOptions,
  ) => Promise<void> | void;

  setup?: (
    context: TypeSafeContext,
    config: TypeSafeConfig,
  ) => Promise<void> | void;
}

export type PluginName = string;
