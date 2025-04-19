import type { Plugin } from "../../extension";

import { PackagePluginAPI } from "./plugin-api";

export const PLUGIN_NAME_PACKAGE = "@holypack/core:Package";

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
