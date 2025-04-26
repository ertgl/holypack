import type { ProjectPlugin } from "./plugin";
import type { ResolvedProject } from "./project";
import {
  type ProjectResolutionOptions,
  resolveProject,
} from "./resolution";
import {
  findProjectRootPath,
  type ProjectRootPathFinderOptions,
} from "./utils/project-root-path-finder";

export class ProjectPluginAPI
{
  plugin: ProjectPlugin;

  constructor(
    plugin: ProjectPlugin,
  )
  {
    this.plugin = plugin;
  }

  async findRootPath(
    options?: null | ProjectRootPathFinderOptions,
  ): Promise<string>
  {
    return await findProjectRootPath(options);
  }

  async resolve(
    options?: null | ProjectResolutionOptions,
  ): Promise<ResolvedProject>
  {
    return await resolveProject(options);
  }
}
