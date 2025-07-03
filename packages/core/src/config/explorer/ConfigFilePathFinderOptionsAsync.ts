import type { ConfigFilePathFinderOptionsBase } from "./ConfigFilePathFinderOptionsBase";
import type { ConfigFilePathFinderOptionsFSTraitAsync } from "./ConfigFilePathFinderOptionsFSTraitAsync";

export type ConfigFilePathFinderOptionsAsync = (
  & ConfigFilePathFinderOptionsBase
  & ConfigFilePathFinderOptionsFSTraitAsync
);
