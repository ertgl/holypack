import type { PathLike } from "../../../lib/fs";

import type { PackageJSON } from "./../package-json";
import {
  requirePackageJSONByDirectoryPath,
  requirePackageJSONByPath,
} from "./../utils/package-json-loader";
import { extractWorkspaceGlobPatternsFromPackageJSON } from "./../utils/workspace-glob-patterns-extractor";
import type { PackagePlugin } from "./plugin";

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
