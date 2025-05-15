import type { StrictContext } from "../../../../../context";
import { emitWarning } from "../utils/warning-emitter";

import type { ProcessWarningMonitorPlugin } from "./plugin";

export class ProcessWarningMonitorPluginAPI
{
  plugin: ProcessWarningMonitorPlugin;

  constructor(
    plugin: ProcessWarningMonitorPlugin,
  )
  {
    this.plugin = plugin;
  }

  async emitWarning(
    context: StrictContext,
    err: Error,
  ): Promise<void>
  {
    await emitWarning(context, err);
  }
}
