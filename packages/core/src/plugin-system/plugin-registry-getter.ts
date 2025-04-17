import type { Context } from "../context";

import type { PluginMap } from "./plugin-map";

export type PluginRegistryGetter = (
  context: Context,
) => PluginMap;

export function getPluginRegistry(
  context: Context,
): PluginMap
{
  return context.plugins;
}
