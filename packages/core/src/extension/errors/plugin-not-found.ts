export const ERROR_PLUGIN_NOT_FOUND = "PluginNotFoundError";

export class PluginNotFoundError extends Error
{
  pluginName: string;

  constructor(
    pluginName: string,
  )
  {
    super(`Plugin not found: ${pluginName}`);
    this.name = ERROR_PLUGIN_NOT_FOUND;
    this.pluginName = pluginName;
  }
}
