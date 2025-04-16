import type { Plugin } from "./plugin";

export const ERROR_PLUGIN_IS_ALREADY_BOUND = "PluginIsAlreadyBoundError";

export const ERROR_PLUGIN_NAME_IS_NOT_DEFINED = "PluginNameIsNotDefinedError";

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

export class PluginNameIsNotDefinedError extends Error
{
  plugin: Plugin;

  constructor(
    plugin: Plugin,
  )
  {
    super("Plugin name is not defined");
    this.name = ERROR_PLUGIN_NAME_IS_NOT_DEFINED;
    this.plugin = plugin;
  }
}
