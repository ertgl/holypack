import type { Plugin } from "../plugin";

export const ERROR_PLUGIN_IS_ALREADY_BOUND = "PluginIsAlreadyBoundError";

export class PluginIsAlreadyBoundError extends Error
{
  plugin: Plugin;

  constructor(
    plugin: Plugin,
  )
  {
    super("Plugin is already bound");
    this.name = ERROR_PLUGIN_IS_ALREADY_BOUND;
    this.plugin = plugin;
  }
}
