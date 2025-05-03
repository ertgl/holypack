import type { Plugin } from "../../../../../extension";
import { PLUGIN_NAME_PROCESS_CWD } from "../plugin-metadata";

import { ProcessCWDPluginAPI } from "./plugin-api";

export class ProcessCWDPlugin implements Plugin
{
  api: ProcessCWDPluginAPI;

  name = PLUGIN_NAME_PROCESS_CWD;

  constructor()
  {
    this.api = new ProcessCWDPluginAPI(this);
  }
}

export function createProcessCWDPlugin(): ProcessCWDPlugin
{
  return new ProcessCWDPlugin();
}
