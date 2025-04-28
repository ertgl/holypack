import type { StrictConfig } from "../config";
import type {
  Context,
  ContextResolutionOptions,
  StrictContext,
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
    context: StrictContext,
    config: StrictConfig,
  ) => Promise<void> | void;

  resolveContext?: (
    context: StrictContext,
    options: ContextResolutionOptions,
  ) => Promise<void> | void;

  setup?: (
    context: StrictContext,
    config: StrictConfig,
  ) => Promise<void> | void;
}

export type PluginName = string;
