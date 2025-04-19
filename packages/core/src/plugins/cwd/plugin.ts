import type { Plugin } from "../../extension";

import { CWDPluginAPI } from "./plugin-api";

export const PLUGIN_NAME_CWD = "@holypack/core:CWD";

export class CWDPlugin implements Plugin
{
  api: CWDPluginAPI;

  name = PLUGIN_NAME_CWD;

  constructor()
  {
    this.api = new CWDPluginAPI(this);
  }
}

export function createCWDPlugin(): CWDPlugin
{
  return new CWDPlugin();
}
