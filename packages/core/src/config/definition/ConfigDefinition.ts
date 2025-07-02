import type { ConfigDefinitionAsync } from "./ConfigDefinitionAsync";
import type { ConfigDefinitionSync } from "./ConfigDefinitionSync";

export type ConfigDefinition = (
  | ConfigDefinitionAsync
  | ConfigDefinitionSync
);
