import type { ConfigFilePathFinderOptionsBase } from "./ConfigFilePathFinderOptionsBase";
import type { ConfigFilePathFinderOptionsFSTraitSync } from "./ConfigFilePathFinderOptionsFSTraitSync";

export type ConfigFilePathFinderOptionsSync = (
  & ConfigFilePathFinderOptionsBase
  & ConfigFilePathFinderOptionsFSTraitSync
);
