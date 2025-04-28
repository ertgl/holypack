import type { TypeSafeContext } from "../context";

import type { IntegrationMap } from "./integration-map";

export type IntegrationRegistryGetter = (
  context: TypeSafeContext,
) => IntegrationMap;

export function getIntegrationRegistry(
  context: TypeSafeContext,
): IntegrationMap
{
  return context.integrations;
}
