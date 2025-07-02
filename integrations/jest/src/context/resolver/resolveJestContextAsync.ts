import type { ContextAsync } from "@holypack/core/context/ContextAsync";
import type { ProjectPlugin } from "@holypack/core/plugins/project/extension/ProjectPlugin";
import { SYSTEM_PLUGIN_UID_PROJECT } from "@holypack/core/plugins/project/extension/SYSTEM_PLUGIN_UID_PROJECT";
import { SYSTEM_PLUGIN_UID_WORKSPACE } from "@holypack/core/plugins/workspace/extension/SYSTEM_PLUGIN_UID_WORKSPACE";
import type { WorkspacePlugin } from "@holypack/core/plugins/workspace/extension/WorkspacePlugin";
import type { Workspace } from "@holypack/core/plugins/workspace/models/Workspace";
import { useSystemExtensionAsync } from "@holypack/core/system/extension/interop/useSystemExtensionAsync";

import type { JestIntegrationResolvedOptions } from "../../options/JestIntegrationResolvedOptions";
import type { JestContext } from "../JestContext";

import { resolveJestEnv } from "./resolveJestEnv";
import { resolveJestPathsAsync } from "./resolveJestPathsAsync";

export async function resolveJestContextAsync(
  context: ContextAsync,
  options: JestIntegrationResolvedOptions,
): Promise<JestContext>
{
  const workspaces: Workspace[] = [];

  const [
    project, workspace,
  ] = await Promise.all([
    useSystemExtensionAsync(
      context,
      SYSTEM_PLUGIN_UID_PROJECT,
      async (
        projectPlugin: ProjectPlugin,
      ) =>
      {
        const [project] = await Promise.all([
          projectPlugin.resolveCurrentProject(context),
          projectPlugin.resolveWorkspacesByCurrentProjectRecursively(
            context,
            workspaces.push.bind(workspaces),
          ),
        ]);

        return project;
      },
    ),
    useSystemExtensionAsync(
      context,
      SYSTEM_PLUGIN_UID_WORKSPACE,
      async (
        workspacePlugin: WorkspacePlugin,
      ) =>
      {
        return await workspacePlugin.resolveCurrentWorkspace(context);
      },
    ),
  ]);

  return {
    cwd: context.cwd,
    env: resolveJestEnv(),
    paths: await resolveJestPathsAsync(
      context,
      workspace,
    ),
    project,
    workspace,
    workspaces,
  };
}
