import {
  findRepositoryRootPath,
  type RepositoryPathFinderOptions,
  type RepositoryResolutionOptions,
  resolveRepository,
} from "./api";
import type { RepositoryPlugin } from "./plugin";
import type { ResolvedRepository } from "./repository";

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
    options?: null | RepositoryPathFinderOptions,
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
