import type { PathLike } from "../../fs";

import type { PackageJSON } from "./package-json";
import type { PackagePlugin } from "./plugin";
import { extractWorkspaceGlobPatternsFromPackageJSON } from "./utils/fields/workspaces";
import {
  requirePackageJSONByDirectoryPath,
  requirePackageJSONByPath,
} from "./utils/module";

export class PackagePluginAPI
{
  plugin: PackagePlugin;

  constructor(
    plugin: PackagePlugin,
  )
  {
    this.plugin = plugin;
  }

  extractWorkspaceGlobPatternsFromPackageJSON(
    packageJSON: PackageJSON,
  ): string[]
  {
    return extractWorkspaceGlobPatternsFromPackageJSON(packageJSON);
  }

  requirePackageJSONByDirectoryPath(
    directoryPath: PathLike,
  ): PackageJSON
  {
    return requirePackageJSONByDirectoryPath(directoryPath);
  }

  requirePackageJSONByPath(
    packageJSONPath: PathLike,
  ): PackageJSON
  {
    return requirePackageJSONByPath(packageJSONPath);
  }
}
