import type { ContextSync } from "@holypack/core/context/ContextSync";
import type { ProjectPlugin } from "@holypack/core/plugins/project/extension/ProjectPlugin";
import { SYSTEM_PLUGIN_UID_PROJECT } from "@holypack/core/plugins/project/extension/SYSTEM_PLUGIN_UID_PROJECT";
import { SYSTEM_PLUGIN_UID_WORKSPACE } from "@holypack/core/plugins/workspace/extension/SYSTEM_PLUGIN_UID_WORKSPACE";
import type { WorkspacePlugin } from "@holypack/core/plugins/workspace/extension/WorkspacePlugin";
import type { Workspace } from "@holypack/core/plugins/workspace/models/Workspace";
import { useSystemExtensionSync } from "@holypack/core/system/extension/interop/useSystemExtensionSync";

import type { WebpackIntegrationResolvedOptions } from "../../options/WebpackIntegrationResolvedOptions";
import type { WebpackContext } from "../WebpackContext";

import { resolveWebpackEnv } from "./resolveWebpackEnv";
import { resolveWebpackPaths } from "./resolveWebpackPaths";

export function resolveWebpackContextSync(
  context: ContextSync,
  options: WebpackIntegrationResolvedOptions,
): WebpackContext
{
  const workspace = useSystemExtensionSync(
    context,
    SYSTEM_PLUGIN_UID_WORKSPACE,
    (
      workspacePlugin: WorkspacePlugin,
    ) =>
    {
      return workspacePlugin.resolveCurrentWorkspaceSync(context);
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

  return {
    cwd: context.cwd,
    env: resolveWebpackEnv(),
    paths: resolveWebpackPaths(
      context,
      workspace,
    ),
    project,
    workspace,
    workspaces,
  };
}
