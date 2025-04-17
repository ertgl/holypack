import type { Context } from "../context";
import { bindPlugin } from "../plugin-system";
import { createRepositoryPlugin } from "../plugins";

export type SystemPluginBinder = (
  context: Context,
) => void;

export function bindDefaultSystemPlugins(
  context: Context,
): void
{
  bindPlugin(context, createRepositoryPlugin());
}
