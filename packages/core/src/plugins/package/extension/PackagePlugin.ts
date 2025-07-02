import { AbstractExtension } from "../../../extension/AbstractExtension";

import { PackagePluginAPI } from "./PackagePluginAPI";
import { SYSTEM_PLUGIN_UID_PACKAGE } from "./SYSTEM_PLUGIN_UID_PACKAGE";

export class PackagePlugin extends AbstractExtension
{
  readonly $uid = SYSTEM_PLUGIN_UID_PACKAGE;

  readonly api: PackagePluginAPI;

  constructor()
  {
    super();

    this.api = new PackagePluginAPI();
  }
}
