import type { TSConfigRootFinderFacet } from "./facets/TSConfigRootFinderFacet";
import type { TypeScriptContextResolverFacet } from "./facets/TypeScriptContextResolverFacet";

export type TypeScriptIntegrationFacets = {
  contextResolver: TypeScriptContextResolverFacet;
  tsconfigRootFinder: TSConfigRootFinderFacet;
};
