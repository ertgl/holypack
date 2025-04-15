import type { Config } from "./config";
import type { Context } from "./context";
import type { ContextResolutionOptions } from "./context-resolution";
import type { Hook } from "./hook";
import type { HookSubscriptionID } from "./hook-subscription-id";

export interface Integration
{
  readonly generateHookSubscriptionID?: (
    hook: Hook,
  ) => HookSubscriptionID;

  readonly name: IntegrationName;

  readonly resolveConfig?: (
    context: Context,
    config: Config,
  ) => Promise<void> | void;

  readonly resolveContext?: (
    context: Context,
    options: ContextResolutionOptions,
  ) => Promise<void> | void;
}

export type IntegrationName = string;
