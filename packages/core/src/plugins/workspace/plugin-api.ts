import type { ResolvedProject } from "../project";

import type { WorkspacePlugin } from "./plugin";
import {
  resolveWorkspaceRegistry,
  type WorkspaceRegistryResolutionOptions,
} from "./registry-resolution";
import {
  findWorkspaceRootPath,
  type WorkspaceRootPathFinderOptions,
} from "./root-path-finder";
import type { WorkspaceRegistry } from "./workspace-registry";

export class WorkspacePluginAPI
{
  plugin: WorkspacePlugin;

  constructor(
    plugin: WorkspacePlugin,
  )
  {
    this.plugin = plugin;
  }

  async findRootPath(
    options?: null | WorkspaceRootPathFinderOptions,
  ): Promise<string>
  {
    return await findWorkspaceRootPath(options);
  }

  async resolve(
    project: ResolvedProject,
    options?: null | WorkspaceRegistryResolutionOptions,
  ): Promise<WorkspaceRegistry>
  {
    return await resolveWorkspaceRegistry(
      project,
      options,
    );
  }
}
