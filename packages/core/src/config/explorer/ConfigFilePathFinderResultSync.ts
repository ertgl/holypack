import type { ConfigFilePathFinderResultFoundSync } from "./ConfigFilePathFinderResultFoundSync";
import type { ConfigFilePathFinderResultNotFound } from "./ConfigFilePathFinderResultNotFound";

export type ConfigFilePathFinderResultSync = (
  | ConfigFilePathFinderResultFoundSync
  | ConfigFilePathFinderResultNotFound
);
