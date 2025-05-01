import type { Configuration } from "webpack";

// TODO(ertgl): Accept function as webpack config definition, by providing a context argument for common use cases.
export type ConfigDefinition<
  C extends Configuration = Configuration,
> = (
  | C
);
