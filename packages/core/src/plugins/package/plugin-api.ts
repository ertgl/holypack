import type { PackagePlugin } from "./plugin";

export class PackagePluginAPI
{
  plugin: PackagePlugin;

  constructor(
    plugin: PackagePlugin,
  )
  {
    this.plugin = plugin;
  }
}
