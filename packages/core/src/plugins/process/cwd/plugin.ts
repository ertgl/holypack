import type { Plugin } from "../../../extension";

import { ProcessCWDPluginAPI } from "./plugin-api";

export const PLUGIN_NAME_PROCESS_PROCESS_CWD = "@holypack/core:Process/CWD";

export class ProcessCWDPlugin implements Plugin
{
  api: ProcessCWDPluginAPI;

  name = PLUGIN_NAME_PROCESS_PROCESS_CWD;

  constructor()
  {
    this.api = new ProcessCWDPluginAPI(this);
  }
}

export function createProcessCWDPlugin(): ProcessCWDPlugin
{
  return new ProcessCWDPlugin();
}
