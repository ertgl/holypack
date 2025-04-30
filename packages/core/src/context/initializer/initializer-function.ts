import type { StrictContext } from "../../context";
import { bindPlugin } from "../../extension";
import { createContinuousIntegrationPlugin } from "../../plugins/ci";
import { createFileSystemPlugin } from "../../plugins/fs";
import { createLegacyPlugin } from "../../plugins/legacy";
import { createPackagePlugin } from "../../plugins/package";
import { createProcessPlugin } from "../../plugins/process";
import { createProjectPlugin } from "../../plugins/project";
import { createRepositoryPlugin } from "../../plugins/repository";
import { createWorkspacePlugin } from "../../plugins/workspace";

export type ContextInitializerFunction = (
  context: StrictContext,
) => void;

export function initializeContext(
  context: StrictContext,
): void
{
  bindPlugin(context, createLegacyPlugin());
  bindPlugin(context, createContinuousIntegrationPlugin());
  bindPlugin(context, createProcessPlugin());
  bindPlugin(context, createFileSystemPlugin());
  bindPlugin(context, createPackagePlugin());
  bindPlugin(context, createRepositoryPlugin());
  bindPlugin(context, createProjectPlugin());
  bindPlugin(context, createWorkspacePlugin());
}
