import type { ContextSync } from "@holypack/core/context/ContextSync";
import type { ProjectPlugin } from "@holypack/core/plugins/project/extension/ProjectPlugin";
import { SYSTEM_PLUGIN_UID_PROJECT } from "@holypack/core/plugins/project/extension/SYSTEM_PLUGIN_UID_PROJECT";
import { SYSTEM_PLUGIN_UID_WORKSPACE } from "@holypack/core/plugins/workspace/extension/SYSTEM_PLUGIN_UID_WORKSPACE";
import type { WorkspacePlugin } from "@holypack/core/plugins/workspace/extension/WorkspacePlugin";
import type { Workspace } from "@holypack/core/plugins/workspace/models/Workspace";
import { useSystemExtensionSync } from "@holypack/core/system/extension/interop/useSystemExtensionSync";

import type { ESLintIntegrationResolvedOptions } from "../../options/ESLintIntegrationResolvedOptions";
import type { ESLintContext } from "../ESLintContext";

import { resolveTypeScriptContextSync } from "./typescript/resolveTypeScriptContextSync";

export function resolveESLintContextSync(
  context: ContextSync,
  options: ESLintIntegrationResolvedOptions,
): ESLintContext
{
  const {
    subWorkspaces,
    workspace,
  } = useSystemExtensionSync(
    context,
    SYSTEM_PLUGIN_UID_WORKSPACE,
    (
      workspacePlugin: WorkspacePlugin,
    ) =>
    {
      const workspace = workspacePlugin.resolveCurrentWorkspaceSync(context);

      const subWorkspaces: Workspace[] = [];

      workspacePlugin.resolveSubWorkspacesByPathRecursivelySync(
        context,
        workspace.path,
        subWorkspaces.push.bind(subWorkspaces),
      );

      return {
        subWorkspaces,
        workspace,
      };
    },
  );

  const workspaces: Workspace[] = [];

  const project = useSystemExtensionSync(
    context,
    SYSTEM_PLUGIN_UID_PROJECT,
    (
      projectPlugin: ProjectPlugin,
    ) =>
    {
      projectPlugin.resolveWorkspacesByCurrentProjectRecursivelySync(
        context,
        workspaces.push.bind(workspaces),
      );

      return projectPlugin.resolveCurrentProjectSync(context);
    },
  );

  const typescriptContext = resolveTypeScriptContextSync(context);

  return {
    cwd: context.cwd,
    project,
    subWorkspaces,
    typescript: typescriptContext,
    workspace,
    workspaces,
  };
}
