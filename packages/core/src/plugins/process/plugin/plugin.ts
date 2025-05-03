import type { StrictConfig } from "../../../config";
import type { StrictContext } from "../../../context";
import { bindSubPlugin, type Plugin } from "../../../extension";
import { PLUGIN_NAME_PROCESS } from "../plugin-metadata";
import { createProcessCWDPlugin } from "../sub-plugins/cwd";
import { createProcessWarningMonitorPlugin } from "../sub-plugins/warning-monitor";

export class ProcessPlugin implements Plugin
{
  name = PLUGIN_NAME_PROCESS;

  async setup(
    context: StrictContext,
    config: StrictConfig,
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
