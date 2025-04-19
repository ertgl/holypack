import type { Context } from "../context";
import { bindPlugin } from "../extension";
import { createCWDPlugin } from "../plugins/cwd";
import { createFileSystemPlugin } from "../plugins/fs";
import { createPackagePlugin } from "../plugins/package";
import { createRepositoryPlugin } from "../plugins/repository";

export type SystemPluginBinder = (
  context: Context,
) => void;

export function bindDefaultSystemPlugins(
  context: Context,
): void
{
  bindPlugin(context, createCWDPlugin());
  bindPlugin(context, createFileSystemPlugin());
  bindPlugin(context, createPackagePlugin());
  bindPlugin(context, createRepositoryPlugin());
}
