import type { Configuration } from "webpack";

export type ConfigDefinition<
  C extends Configuration = Configuration,
> = (
  | C
);
