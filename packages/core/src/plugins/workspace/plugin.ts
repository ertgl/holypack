import type { Config } from "../../config";
import type { Context } from "../../context";
import { generateHookSubscriptionIDForPlugin } from "../../eventing";
import {
  type Plugin,
  requirePlugin,
} from "../../extension";
import {
  PLUGIN_NAME_PROJECT,
  type ProjectPlugin,
  type ResolvedProject,
} from "../project";

import { WorkspacePluginAPI } from "./plugin-api";

export const PLUGIN_NAME_WORKSPACE = "@holypack/core:Workspace";

export class WorkspacePlugin implements Plugin
{
  api: WorkspacePluginAPI;

  name = PLUGIN_NAME_WORKSPACE;

  constructor()
  {
    this.api = new WorkspacePluginAPI(this);
  }

  async onProjectResolved(
    context: Context,
    config: Config,
    project: ResolvedProject,
  ): Promise<void>
  {
    context.workspaces = await this.api.resolve(
      project,
      {
        cwd: context.cwd,
        workspaces: config.workspaces,
      },
    );
  }

  resolveConfig(
    context: Context,
    config: Config,
  ): void
  {
    const projectPlugin = requirePlugin<ProjectPlugin>(
      context,
      PLUGIN_NAME_PROJECT,
    );

    projectPlugin.hooks.postProjectResolution.tapPromise(
      generateHookSubscriptionIDForPlugin(
        this,
        projectPlugin.hooks.postProjectResolution,
      ),
      this.onProjectResolved.bind(
        this,
        context,
        config,
      ),
    );
  }
}

export function createWorkspacePlugin(): WorkspacePlugin
{
  return new WorkspacePlugin();
}
