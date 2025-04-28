import type { TypeSafeConfig } from "../../config";
import type { TypeSafeContext } from "../../context";
import type { Plugin } from "../../extension";

import {
  createProjectHookSet,
  type ProjectHookSet,
} from "./eventing";
import {
  type Project,
  resolveProject,
} from "./project";

export const PLUGIN_NAME_PROJECT = "@holypack/core:Project";

export class ProjectPlugin implements Plugin
{
  hooks: ProjectHookSet;

  name = PLUGIN_NAME_PROJECT;

  constructor()
  {
    this.hooks = createProjectHookSet();
  }

  async resolveConfig(
    context: TypeSafeContext,
    config: TypeSafeConfig,
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
