import type { ContextAsync } from "@holypack/core/context/ContextAsync";
import type { ProjectPlugin } from "@holypack/core/plugins/project/extension/ProjectPlugin";
import { SYSTEM_PLUGIN_UID_PROJECT } from "@holypack/core/plugins/project/extension/SYSTEM_PLUGIN_UID_PROJECT";
import { SYSTEM_PLUGIN_UID_WORKSPACE } from "@holypack/core/plugins/workspace/extension/SYSTEM_PLUGIN_UID_WORKSPACE";
import type { WorkspacePlugin } from "@holypack/core/plugins/workspace/extension/WorkspacePlugin";
import type { Workspace } from "@holypack/core/plugins/workspace/models/Workspace";
import { useSystemExtensionAsync } from "@holypack/core/system/extension/interop/useSystemExtensionAsync";

import type { ESLintIntegrationResolvedOptions } from "../../options/ESLintIntegrationResolvedOptions";
import type { ESLintContext } from "../ESLintContext";

import { resolveTypeScriptContextAsync } from "./typescript/resolveTypeScriptContextAsync";

export async function resolveESLintContextAsync(
  context: ContextAsync,
  options: ESLintIntegrationResolvedOptions,
): Promise<ESLintContext>
{
  const subWorkspaces: Workspace[] = [];

  const workspace = await useSystemExtensionAsync(
    context,
    SYSTEM_PLUGIN_UID_WORKSPACE,
    async (
      workspacePlugin: WorkspacePlugin,
    ) =>
    {
      const workspace = await workspacePlugin.resolveCurrentWorkspace(context);

      await workspacePlugin.resolveSubWorkspacesByPathRecursively(
        context,
        workspace.path,
        subWorkspaces.push.bind(subWorkspaces),
      );

      return workspace;
    },
  );

  const workspaces: Workspace[] = [];

  const project = await useSystemExtensionAsync(
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
  );

  const typescriptContext = await resolveTypeScriptContextAsync(context);

  return {
    cwd: context.cwd,
    project,
    subWorkspaces,
    typescript: typescriptContext,
    workspace,
    workspaces,
  };
}
