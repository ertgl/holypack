import type { BabelConfigFilePathFinderFacet } from "./facets/BabelConfigFilePathFinderFacet";
import type { BabelConfiguratorFacet } from "./facets/BabelConfiguratorFacet";

export type BabelIntegrationFacets = {
  configFileFinder: BabelConfigFilePathFinderFacet;
  configurator: BabelConfiguratorFacet;
};
