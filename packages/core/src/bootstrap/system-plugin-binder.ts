import type { Context } from "../context";
import { bindPlugin } from "../extension";
import { createFileSystemPlugin } from "../plugins/fs";
import { createPackagePlugin } from "../plugins/package";
import { createProcessPlugin } from "../plugins/process";
import { createProjectPlugin } from "../plugins/project";
import { createRepositoryPlugin } from "../plugins/repository";
import { createWorkspacePlugin } from "../plugins/workspace";

export type SystemPluginBinder = (
  context: Context,
) => void;

export function bindDefaultSystemPlugins(
  context: Context,
): void
{
  bindPlugin(context, createProcessPlugin());
  bindPlugin(context, createFileSystemPlugin());
  bindPlugin(context, createPackagePlugin());
  bindPlugin(context, createRepositoryPlugin());
  bindPlugin(context, createProjectPlugin());
  bindPlugin(context, createWorkspacePlugin());
}
