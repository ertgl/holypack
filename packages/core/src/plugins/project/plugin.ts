import type { Config } from "../../config";
import type { Context } from "../../context";
import type { Plugin } from "../../extension";

import { ProjectPluginAPI } from "./plugin-api";

export const PLUGIN_NAME_PROJECT = "@holypack/core:Project";

export class ProjectPlugin implements Plugin
{
  api: ProjectPluginAPI;

  name = PLUGIN_NAME_PROJECT;

  constructor()
  {
    this.api = new ProjectPluginAPI(this);
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
  }
}

export function createProjectPlugin(): ProjectPlugin
{
  return new ProjectPlugin();
}
