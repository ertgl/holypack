import { requirePackageJSONByDirectoryPath } from "../../../package/utils/package-json-loader";
import { extractWorkspaceGlobPatternsFromPackageJSON } from "../../../package/utils/workspace-glob-patterns-extractor";
import { getWorkspacePathsByGlobPatterns } from "../../../package/utils/workspace-paths-extractor";
import type { ResolvedProject } from "../../../project/project";
import { resolveWorkspace } from "../../workspace";
import {
  createWorkspaceRegistry,
  type WorkspaceRegistry,
} from "../workspace-registry";

import type { WorkspaceRegistryResolutionOptions } from "./options";

export async function resolveWorkspaceRegistry(
  project: ResolvedProject,
  options?: null | WorkspaceRegistryResolutionOptions,
): Promise<WorkspaceRegistry>
{
  options ??= {};

  const registry = createWorkspaceRegistry();

  const workspaceGlobPatterns = extractWorkspaceGlobPatternsFromPackageJSON(
    project.packageJSON,
  );

  const workspacePaths = await getWorkspacePathsByGlobPatterns(
    project.path,
    workspaceGlobPatterns,
    {
      fs: options.fs,
    },
  );

  for (const workspacePath of workspacePaths)
  {
    const isWorkspaceExternal = !workspacePath.startsWith(project.path);

    const workspacePackageJSON = requirePackageJSONByDirectoryPath(workspacePath);

    const workspace = resolveWorkspace({
      cwd: workspacePath,
      fs: options.fs,
      isExternal: isWorkspaceExternal,
      packageJSON: workspacePackageJSON,
      workspace: (
        (
          typeof workspacePackageJSON.name === "string"
          && workspacePackageJSON.name !== ""
        )
          ? options.workspaces?.[workspacePackageJSON.name]
          : null
      ),
    });

    registry.set(workspace.name, workspace);
  }

  return registry;
}
