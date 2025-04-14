import type { Config } from "./config";
import type { ConfigContext } from "./config-context";

export type ConfigAsyncFunction<
  C extends Config = Config,
> = (
  context: ConfigContext,
) => Promise<C>;

export type ConfigFunction<
  C extends Config = Config,
> = (
  | ConfigAsyncFunction<C>
  | ConfigSyncFunction<C>
);

export type ConfigSyncFunction<
  C extends Config = Config,
> = (
  context: ConfigContext,
) => C;
