import type { StrictContext } from "../context";

import type { IntegrationMap } from "./integration-map";

export type IntegrationRegistryGetter = (
  context: StrictContext,
) => IntegrationMap;

export function getIntegrationRegistry(
  context: StrictContext,
): IntegrationMap
{
  return context.integrations;
}
