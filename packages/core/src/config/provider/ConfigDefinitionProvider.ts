import type { ConfigDefinitionProviderMaybeAsync } from "./ConfigDefinitionProviderMaybeAsync";
import type { ConfigDefinitionProviderSync } from "./ConfigDefinitionProviderSync";

export type ConfigDefinitionProvider = (
  | ConfigDefinitionProviderMaybeAsync
  | ConfigDefinitionProviderSync
);
