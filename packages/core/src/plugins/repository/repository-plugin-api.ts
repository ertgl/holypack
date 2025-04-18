import {
  findRepositoryRootPath,
  type RepositoryPathFinderOptions,
} from "./api";
import type { RepositoryPlugin } from "./repository-plugin";

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
}
