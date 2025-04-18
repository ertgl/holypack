import { createPluginMap } from "../extension";

import type {
  Integration,
  IntegrationName,
} from "./integration";

export type IntegrationMap = Map<IntegrationName, Integration>;

export function createIntegrationMap(): IntegrationMap
{
  return createPluginMap();
}
