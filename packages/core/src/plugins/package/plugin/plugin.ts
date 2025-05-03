import type { Plugin } from "../../../extension";
import { PLUGIN_NAME_PACKAGE } from "../plugin-metadata";

import { PackagePluginAPI } from "./plugin-api";

export class PackagePlugin implements Plugin
{
  api: PackagePluginAPI;

  name = PLUGIN_NAME_PACKAGE;

  constructor()
  {
    this.api = new PackagePluginAPI(this);
  }
}

export function createPackagePlugin(): PackagePlugin
{
  return new PackagePlugin();
}
