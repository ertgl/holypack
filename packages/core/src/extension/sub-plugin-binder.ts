import type { StrictConfig } from "../config";
import type { StrictContext } from "../context";
import { maybeAwait } from "../lib/promise";

import type { Plugin } from "./plugin";
import { bindPlugin } from "./plugin-binder";
import type { PluginBinderOptions } from "./plugin-binder-options";

export async function bindSubPlugin(
  context: StrictContext,
  config: StrictConfig,
  plugin: Plugin,
  options?: null | PluginBinderOptions,
): Promise<void>
{
  bindPlugin(context, plugin, options);

  if (plugin.setup != null)
  {
    await maybeAwait(plugin.setup(context, config));
  }
}
