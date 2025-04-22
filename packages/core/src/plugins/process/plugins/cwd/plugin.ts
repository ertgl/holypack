import type { Plugin } from "../../../../extension";
import { PLUGIN_NAME_PROCESS } from "../../plugin-name";

import { ProcessCWDPluginAPI } from "./plugin-api";

export const PLUGIN_NAME_PROCESS_CWD = `${PLUGIN_NAME_PROCESS}/CWD`;

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
