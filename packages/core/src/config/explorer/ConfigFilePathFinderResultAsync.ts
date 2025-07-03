import type { ConfigFilePathFinderResultFoundAsync } from "./ConfigFilePathFinderResultFoundAsync";
import type { ConfigFilePathFinderResultNotFound } from "./ConfigFilePathFinderResultNotFound";

export type ConfigFilePathFinderResultAsync = (
  | ConfigFilePathFinderResultFoundAsync
  | ConfigFilePathFinderResultNotFound
);
