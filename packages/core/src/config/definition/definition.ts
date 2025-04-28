import type { Config } from "../config";
import type { ConfigProviderFunction } from "../provider";

export type ConfigDefinition<
  C extends Config = Config,
> = (
  | C
  | ConfigProviderFunction<C>
);
