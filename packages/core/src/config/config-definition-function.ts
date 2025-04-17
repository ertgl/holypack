import type { Config } from "./config";
import type { ConfigContext } from "./config-context";

export type ConfigDefinitionAsyncFunction<
  C extends Config = Config,
> = (
  context: ConfigContext,
) => Promise<C>;

export type ConfigDefinitionFunction<
  C extends Config = Config,
> = (
  | ConfigDefinitionAsyncFunction<C>
  | ConfigDefinitionSyncFunction<C>
);

export type ConfigDefinitionSyncFunction<
  C extends Config = Config,
> = (
  context: ConfigContext,
) => C;
