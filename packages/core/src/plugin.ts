import type { Config } from "./config";
import type {
  Context,
  ResolvedContext,
} from "./context";
import type { ContextResolutionOptions } from "./context-resolution-options";
import type { Hook } from "./hook";
import type { HookSubscriptionID } from "./hook-subscription-id";

export interface Plugin
{
  readonly generateHookSubscriptionID?: (
    hook: Hook,
  ) => HookSubscriptionID;

  readonly name: PluginName;

  readonly onContextReady?: (
    context: ResolvedContext,
  ) => Promise<void> | void;

  readonly resolveConfig?: (
    context: Context,
    config: Config,
  ) => Promise<void> | void;

  readonly resolveContext?: (
    context: Context,
    options: ContextResolutionOptions,
  ) => Promise<void> | void;
}

export type PluginName = string;
