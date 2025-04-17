import type { Context } from "../context";

import type { IntegrationMap } from "./integration-map";

export type IntegrationRegistryGetter = (
  context: Context,
) => IntegrationMap;

export function getIntegrationRegistry(
  context: Context,
): IntegrationMap
{
  return context.integrations;
}
