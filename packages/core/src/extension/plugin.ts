import type { Config } from "../config";
import type {
  Context,
  ContextResolutionOptions,
  ResolvedContext,
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
    context: ResolvedContext,
  ) => Promise<void> | void;

  onWarningEmitted?: (
    context: Context | ResolvedContext,
    err: Error,
  ) => Promise<void> | void;

  resolveConfig?: (
    context: Context,
    config: Config,
  ) => Promise<void> | void;

  resolveContext?: (
    context: Context,
    options: ContextResolutionOptions,
  ) => Promise<void> | void;

  setup?: (
    context: Context,
    config: Config,
  ) => Promise<void> | void;
}

export type PluginName = string;
