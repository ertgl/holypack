import type {
  Integration,
  IntegrationName,
} from "./integration";
import { createPluginMap } from "./plugin-map";

export type IntegrationMap = Map<IntegrationName, Integration>;

export function createIntegrationMap(): IntegrationMap
{
  return createPluginMap();
}
