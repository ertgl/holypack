import type { Config } from "./config";
import type { ConfigFunction } from "./config-function";

export type ConfigInput<
  C extends Config = Config,
> = (
  | C
  | ConfigFunction<C>
);
