import type { PathLike } from "node:fs";

import {
  checkIfPathExists,
  type PathExistenceCheckerOptions,
} from "../../utils/fs/path-existence-checker";
import {
  findRootPath,
  type RootPathFinderOptions,
} from "../../utils/fs/root-path-finder";
import { convertPathLikeToString } from "../../utils/path";

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

  convertPathLikeToString(
    path: PathLike,
  ): string
  {
    return convertPathLikeToString(path);
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
