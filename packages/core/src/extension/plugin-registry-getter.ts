import type { StrictContext } from "../context";

import type { PluginMap } from "./plugin-map";

export type PluginRegistryGetter = (
  context: StrictContext,
) => PluginMap;

export function getPluginRegistry(
  context: StrictContext,
): PluginMap
{
  return context.plugins;
}
