import type { PathLike } from "node:fs";

import {
  checkIfPathExists,
  findRootPath,
  type PathExistenceCheckerOptions,
  type RootPathFinderOptions,
} from "./api";
import type { FileSystemPlugin } from "./plugin";

export class FileSystemPluginAPI
{
  plugin: FileSystemPlugin;

  constructor(
    plugin: FileSystemPlugin,
  )
  {
    this.plugin = plugin;
  }

  async checkIfPathExists(
    path: PathLike,
    options?: null | PathExistenceCheckerOptions,
  ): Promise<boolean>
  {
    return await checkIfPathExists(
      path,
      options,
    );
  }

  async findRootPath(
    cwd: PathLike,
    lookupPaths: string[],
    options?: null | RootPathFinderOptions,
  ): Promise<string>
  {
    return await findRootPath(
      cwd,
      lookupPaths,
      options,
    );
  }
}
