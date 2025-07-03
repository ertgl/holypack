import type { Optional } from "../../lib/object/Optional";
import type { ConfigDefinitionAsync } from "../definition/ConfigDefinitionAsync";
import type { ConfigDefinitionProviderMaybeAsync } from "../provider/ConfigDefinitionProviderMaybeAsync";

import type { ConfigFilePathFinderResultFoundBase } from "./ConfigFilePathFinderResultFoundBase";

export type ConfigFilePathFinderResultFoundAsync = (
  & ConfigFilePathFinderResultFoundBase
  & {
    configDefinition: Optional<ConfigDefinitionAsync | ConfigDefinitionProviderMaybeAsync>;
  }
);
