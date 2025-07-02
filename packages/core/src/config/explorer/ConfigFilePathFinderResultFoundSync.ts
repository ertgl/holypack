import type { Optional } from "../../lib/object/Optional";
import type { ConfigDefinitionSync } from "../definition/ConfigDefinitionSync";
import type { ConfigDefinitionProviderSync } from "../provider/ConfigDefinitionProviderSync";

import type { ConfigFilePathFinderResultFoundBase } from "./ConfigFilePathFinderResultFoundBase";

export type ConfigFilePathFinderResultFoundSync = (
  & ConfigFilePathFinderResultFoundBase
  & {
    configDefinition: Optional<ConfigDefinitionProviderSync | ConfigDefinitionSync>;
  }
);
