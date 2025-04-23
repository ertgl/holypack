import type { Config } from "../../config";
import type { Context } from "../../context";
import type { Plugin } from "../../extension";

import {
  createProjectHookSet,
  type ProjectHookSet,
} from "./eventing";
import { ProjectPluginAPI } from "./plugin-api";
import type { ResolvedProject } from "./project";

export const PLUGIN_NAME_PROJECT = "@holypack/core:Project";

export class ProjectPlugin implements Plugin
{
  api: ProjectPluginAPI;

  hooks: ProjectHookSet;

  name = PLUGIN_NAME_PROJECT;

  constructor()
  {
    this.api = new ProjectPluginAPI(this);
    this.hooks = createProjectHookSet();
  }

  async resolveConfig(
    context: Context,
    config: Config,
  ): Promise<void>
  {
    context.project = await this.api.resolve({
      cwd: context.cwd,
      project: config.project,
    });

    await this.hooks.projectResolution.promise(context);
    await this.hooks.postProjectResolution.promise(context.project as ResolvedProject);
  }
}

export function createProjectPlugin(): ProjectPlugin
{
  return new ProjectPlugin();
}
