import type { StrictConfig } from "../../../../config";
import type { StrictContext } from "../../../../context";
import { generateHookSubscriptionIDForPlugin } from "../../../../eventing";
import type { Plugin } from "../../../../extension";

import { createEmitWarningHook, HOOK_NAME_EMIT_WARNING } from "./hooks";
import { ProcessWarningMonitorPluginAPI } from "./plugin-api";
import { PLUGIN_NAME_PROCESS_WARNING_MONITOR } from "./plugin-name";

export class ProcessWarningMonitorPlugin implements Plugin
{
  api: ProcessWarningMonitorPluginAPI;

  name = PLUGIN_NAME_PROCESS_WARNING_MONITOR;

  constructor()
  {
    this.api = new ProcessWarningMonitorPluginAPI(this);
  }

  handleWarning(
    context: StrictContext,
    err: Error,
  ): void
  {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (context.config.process!.warningMonitor!.emit)
    {
      process.emitWarning(err);
    }
  }

  setup(
    context: StrictContext,
    config: StrictConfig,
  ): void
  {
    const warningMonitorResolvedConfig = {
      emit: config.process?.warningMonitor?.emit ?? true,
    };

    context.config.process ??= {};
    context.config.process.warningMonitor = warningMonitorResolvedConfig;

    const emitWarningHook = createEmitWarningHook();

    emitWarningHook.tap(
      generateHookSubscriptionIDForPlugin(
        this,
        emitWarningHook,
      ),
      this.handleWarning.bind(this),
    );

    context.hooks[HOOK_NAME_EMIT_WARNING] = emitWarningHook;
  }
}

export function createProcessWarningMonitorPlugin(): ProcessWarningMonitorPlugin
{
  return new ProcessWarningMonitorPlugin();
}
