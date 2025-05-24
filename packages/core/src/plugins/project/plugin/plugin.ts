import type { StrictConfig } from "../../../config";
import type { StrictContext } from "../../../context";
import type { Plugin } from "../../../extension";
import { PLUGIN_NAME_PROJECT } from "../plugin-metadata";
import {
  type Project,
  resolveProject,
} from "../project";

import {
  createProjectHookSet,
  type ProjectHookSet,
} from "./eventing";

export class ProjectPlugin implements Plugin
{
  hooks: ProjectHookSet;

  name = PLUGIN_NAME_PROJECT;

  constructor()
  {
    this.hooks = createProjectHookSet();
  }

  async resolveConfig(
    context: StrictContext,
    config: StrictConfig,
  ): Promise<void>
  {
    context.project = await resolveProject(
      context,
      this.hooks,
      {
        cwd: context.cwd,
        project: config.project,
      },
    ) as unknown as Project;
  }
}

export function createProjectPlugin(): ProjectPlugin
{
  return new ProjectPlugin();
}
