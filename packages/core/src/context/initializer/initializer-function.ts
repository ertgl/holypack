import type { TypeSafeContext } from "../../context";
import { bindPlugin } from "../../extension";
import { createFileSystemPlugin } from "../../plugins/fs";
import { createLegacyPlugin } from "../../plugins/legacy";
import { createPackagePlugin } from "../../plugins/package";
import { createProcessPlugin } from "../../plugins/process";
import { createProjectPlugin } from "../../plugins/project";
import { createRepositoryPlugin } from "../../plugins/repository";
import { createWorkspacePlugin } from "../../plugins/workspace";

export type ContextInitializerFunction = (
  context: TypeSafeContext,
) => void;

export function initializeContext(
  context: TypeSafeContext,
): void
{
  bindPlugin(context, createLegacyPlugin());
  bindPlugin(context, createProcessPlugin());
  bindPlugin(context, createFileSystemPlugin());
  bindPlugin(context, createPackagePlugin());
  bindPlugin(context, createRepositoryPlugin());
  bindPlugin(context, createProjectPlugin());
  bindPlugin(context, createWorkspacePlugin());
}
