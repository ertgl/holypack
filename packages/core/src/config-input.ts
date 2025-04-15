import type { Config } from "./config";
import type { ConfigDefinitionFunction } from "./config-definition-function";

export type ConfigInput<
  C extends Config = Config,
> = (
  | C
  | ConfigDefinitionFunction<C>
);
