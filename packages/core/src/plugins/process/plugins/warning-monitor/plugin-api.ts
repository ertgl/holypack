import type { TypeSafeContext } from "../../../../context";

import type { ProcessWarningMonitorPlugin } from "./plugin";
import { emitWarning } from "./utils/warning-emitter";

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
    context: TypeSafeContext,
    err: Error,
  ): Promise<void>
  {
    await emitWarning(context, err);
  }
}
