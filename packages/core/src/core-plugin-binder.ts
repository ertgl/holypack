import type { Context } from "./context";
import { bindPlugin } from "./plugin-binder";
import { createRepositoryPlugin } from "./plugins";

export type CorePluginBinder = (
  context: Context,
) => void;

export function bindDefaultCorePlugins(
  context: Context,
): void
{
  bindPlugin(context, createRepositoryPlugin());
}
