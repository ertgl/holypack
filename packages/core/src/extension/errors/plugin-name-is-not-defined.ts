import type { Plugin } from "../plugin";

export const ERROR_PLUGIN_NAME_IS_NOT_DEFINED = "PluginNameIsNotDefinedError";

export class PluginNameIsNotDefinedError extends Error
{
  plugin: Plugin;

  constructor(
    plugin: Plugin,
  )
  {
    super(`Plugin name is not defined: ${plugin.constructor.name}`);
    this.name = ERROR_PLUGIN_NAME_IS_NOT_DEFINED;
    this.plugin = plugin;
  }
}
