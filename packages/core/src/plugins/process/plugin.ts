import type { TypeSafeConfig } from "../../config";
import type { TypeSafeContext } from "../../context";
import { bindSubPlugin, type Plugin } from "../../extension";

import { PLUGIN_NAME_PROCESS } from "./plugin-name";
import { createProcessCWDPlugin } from "./plugins/cwd";
import { createProcessWarningMonitorPlugin } from "./plugins/warning-monitor";

export class ProcessPlugin implements Plugin
{
  name = PLUGIN_NAME_PROCESS;

  async setup(
    context: TypeSafeContext,
    config: TypeSafeConfig,
  ): Promise<void>
  {
    context.config.process = {};

    await bindSubPlugin(context, config, createProcessCWDPlugin());
    await bindSubPlugin(context, config, createProcessWarningMonitorPlugin());
  }
}

export function createProcessPlugin(): ProcessPlugin
{
  return new ProcessPlugin();
}
