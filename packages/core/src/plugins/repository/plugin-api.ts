import type { RepositoryPlugin } from "./plugin";
import type { ResolvedRepository } from "./repository";
import {
  type RepositoryResolutionOptions,
  resolveRepository,
} from "./resolution";
import {
  findRepositoryRootPath,
  type RepositoryRootPathFinderOptions,
} from "./utils/repository-root-path-finder";

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
