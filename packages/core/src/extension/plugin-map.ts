import type {
  Plugin,
  PluginName,
} from "./plugin";

export type PluginMap = Map<PluginName, Plugin>;

export function createPluginMap(): PluginMap
{
  return new Map();
}
