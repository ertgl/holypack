import type { StrictConfig } from "../../../config";
import type { StrictContext } from "../../../context";
import { generateHookSubscriptionIDForPlugin } from "../../../eventing";
import {
  type Plugin,
  requirePlugin,
} from "../../../extension";
import {
  PLUGIN_NAME_PROJECT,
  type Project,
  type ProjectPath,
  type ProjectPlugin,
  type ResolvedProject,
} from "../../project";
import { HOOK_NAME_RESOLVE_PROJECT } from "../../project/plugin/hooks";
import { PLUGIN_NAME_WORKSPACE } from "../plugin-metadata";
import { resolveWorkspaceRegistry } from "../workspace-registry";

export class WorkspacePlugin implements Plugin
{
  name = PLUGIN_NAME_WORKSPACE;

  resolveConfig(
    context: StrictContext,
    config: StrictConfig,
  ): void
  {
    const projectPlugin = requirePlugin<ProjectPlugin>(
      context,
      PLUGIN_NAME_PROJECT,
    );

    projectPlugin.hooks[HOOK_NAME_RESOLVE_PROJECT].tapPromise(
      generateHookSubscriptionIDForPlugin(
        this,
        projectPlugin.hooks[HOOK_NAME_RESOLVE_PROJECT],
      ),
      this.resolveProjectWorkspaceRegistry.bind(
        this,
        context,
        config,
      ),
    );
  }

  async resolveProjectWorkspaceRegistry(
    context: StrictContext,
    config: StrictConfig,
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
