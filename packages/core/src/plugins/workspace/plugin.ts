import type { TypeSafeConfig } from "../../config";
import type { TypeSafeContext } from "../../context";
import { generateHookSubscriptionIDForPlugin } from "../../eventing";
import {
  type Plugin,
  requirePlugin,
} from "../../extension";
import {
  PLUGIN_NAME_PROJECT,
  type Project,
  type ProjectPath,
  type ProjectPlugin,
  type ResolvedProject,
} from "../project";

import { resolveWorkspaceRegistry } from "./registry";

export const PLUGIN_NAME_WORKSPACE = "@holypack/core:Workspace";

export class WorkspacePlugin implements Plugin
{
  name = PLUGIN_NAME_WORKSPACE;

  resolveConfig(
    context: TypeSafeContext,
    config: TypeSafeConfig,
  ): void
  {
    const projectPlugin = requirePlugin<ProjectPlugin>(
      context,
      PLUGIN_NAME_PROJECT,
    );

    projectPlugin.hooks.projectResolution.tapPromise(
      generateHookSubscriptionIDForPlugin(
        this,
        projectPlugin.hooks.projectResolution,
      ),
      this.resolveProjectWorkspaceRegistry.bind(
        this,
        context,
        config,
      ),
    );
  }

  async resolveProjectWorkspaceRegistry(
    context: TypeSafeContext,
    config: TypeSafeConfig,
    projectPath: ProjectPath,
    project: ResolvedProject,
    projectConfig: Project,
  ): Promise<void>
  {
    project.workspaces = await resolveWorkspaceRegistry(
      project,
      {
        cwd: projectPath,
        workspaces: projectConfig.workspaces,
      },
    );
  }
}

export function createWorkspacePlugin(): WorkspacePlugin
{
  return new WorkspacePlugin();
}
