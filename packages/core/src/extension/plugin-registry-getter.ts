import type { TypeSafeContext } from "../context";

import type { PluginMap } from "./plugin-map";

export type PluginRegistryGetter = (
  context: TypeSafeContext,
) => PluginMap;

export function getPluginRegistry(
  context: TypeSafeContext,
): PluginMap
{
  return context.plugins;
}
