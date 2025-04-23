import {
  extractWorkspaceGlobPatternsFromPackageJSON,
  findWorkspacePathsByGlobPatterns,
} from "../../package/utils/fields/workspaces";
import { requirePackageJSONByDirectoryPath } from "../../package/utils/module";
import type { ResolvedProject } from "../../project";
import { resolveWorkspace } from "../resolution";
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

  const workspacePaths = await findWorkspacePathsByGlobPatterns(
    project.path,
    workspaceGlobPatterns,
  );

  for (const workspacePath of workspacePaths)
  {
    const workspacePackageJSON = requirePackageJSONByDirectoryPath(workspacePath);

    const workspace = resolveWorkspace({
      cwd: workspacePath,
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
