import type {
  Context,
  ResolvedContext,
} from "../../../../context";
import { emitWarning } from "../../../../context/warnings";

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
    context: Context | ResolvedContext,
    err: Error,
  ): Promise<void>
  {
    await emitWarning(context, err);
  }
}
