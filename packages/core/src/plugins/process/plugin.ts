import type { Config } from "../../config";
import type { Context } from "../../context";
import { bindSubPlugin, type Plugin } from "../../extension";

import { PLUGIN_NAME_PROCESS } from "./plugin-name";
import { createProcessCWDPlugin } from "./plugins/cwd";
import { createProcessWarningMonitorPlugin } from "./plugins/warning-monitor";

export class ProcessPlugin implements Plugin
{
  name = PLUGIN_NAME_PROCESS;

  async setup(
    context: Context,
    config: Config,
  ): Promise<void>
  {
    // @ts-expect-error - Process config will be filled in by the sub-plugins.
    context.config.process = {};

    await bindSubPlugin(context, config, createProcessCWDPlugin());
    await bindSubPlugin(context, config, createProcessWarningMonitorPlugin());
  }
}

export function createProcessPlugin(): ProcessPlugin
{
  return new ProcessPlugin();
}
