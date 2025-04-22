import type { Config } from "../../../../config";
import type { Context, ResolvedContext } from "../../../../context";
import { generateHookSubscriptionIDForPlugin } from "../../../../eventing";
import type { Plugin } from "../../../../extension";
import { PLUGIN_NAME_PROCESS } from "../../plugin-name";

import { ProcessWarningMonitorPluginAPI } from "./plugin-api";

export const PLUGIN_NAME_PROCESS_WARNING_MONITOR = `${PLUGIN_NAME_PROCESS}/WarningMonitor`;

export class ProcessWarningMonitorPlugin implements Plugin
{
  api: ProcessWarningMonitorPluginAPI;

  name = PLUGIN_NAME_PROCESS_WARNING_MONITOR;

  constructor()
  {
    this.api = new ProcessWarningMonitorPluginAPI(this);
  }

  onEmitWarning(
    context: Context | ResolvedContext,
    err: Error,
  ): void
  {
    if (context.config.process.warningMonitor.emit)
    {
      process.emitWarning(err);
    }
  }

  setup(
    context: Context,
    config: Config,
  ): void
  {
    context.config.process.warningMonitor = {
      emit: config.process?.warningMonitor?.emit ?? true,
    };

    context.hooks.emitWarning.tap(
      generateHookSubscriptionIDForPlugin(
        this,
        context.hooks.emitWarning,
      ),
      this.onEmitWarning.bind(this),
    );
  }
}

export function createProcessWarningMonitorPlugin(): ProcessWarningMonitorPlugin
{
  return new ProcessWarningMonitorPlugin();
}
