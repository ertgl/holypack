import { createPluginMap } from "../plugin-system";

import type {
  Integration,
  IntegrationName,
} from "./integration";

export type IntegrationMap = Map<IntegrationName, Integration>;

export function createIntegrationMap(): IntegrationMap
{
  return createPluginMap();
}
