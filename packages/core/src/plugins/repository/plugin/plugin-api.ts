import type { ResolvedRepository } from "../repository";
import {
  type RepositoryResolutionOptions,
  resolveRepository,
} from "../repository/resolution";
import {
  findRepositoryRootPath,
  type RepositoryRootPathFinderOptions,
} from "../utils/repository-root-path-finder";

import type { RepositoryPlugin } from "./plugin";

export class RepositoryPluginAPI
{
  plugin: RepositoryPlugin;

  constructor(
    plugin: RepositoryPlugin,
  )
  {
    this.plugin = plugin;
  }

  async findRootPath(
    options?: null | RepositoryRootPathFinderOptions,
  ): Promise<string>
  {
    return await findRepositoryRootPath(options);
  }

  async resolve(
    options?: null | RepositoryResolutionOptions,
  ): Promise<ResolvedRepository>
  {
    return await resolveRepository(options);
  }
}
