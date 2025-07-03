import { getDirentFullPath } from "../../lib/fs/dirent/getDirentFullPath";
import { resolveFileSystemFunctionSync } from "../../lib/fs/resolveFileSystemFunctionSync";
import { getValueByKeyPath } from "../../lib/object/getValueByKeyPath";
import type { Optional } from "../../lib/object/Optional";
import { absolutifyPath } from "../../lib/path/absolutifyPath";
import type { Path } from "../../lib/path/Path";
import { findRootPathSync } from "../../lib/path/rooter/findRootPathSync";
import { ROOT_PATH_FINDER_STRATEGY_INNERMOST } from "../../lib/path/rooter/ROOT_PATH_FINDER_STRATEGY_INNERMOST";
import { resolveCWD } from "../../lib/process/cwd/resolveCWD";
import type { ConfigDefinition } from "../definition/ConfigDefinition";
import type { ConfigDefinitionProviderSync } from "../provider/ConfigDefinitionProviderSync";

import type { ConfigFilePathFinderOptionsSync } from "./ConfigFilePathFinderOptionsSync";
import type { ConfigFilePathFinderResultSync } from "./ConfigFilePathFinderResultSync";
import { getConfigFilePathGlobPatterns } from "./getConfigFilePathGlobPatterns";
import { getConfigPackageJSONPropertyKeyPath } from "./getConfigPackageJSONPropertyKeyPath";

export function findConfigFilePathSync(
  options?: Optional<ConfigFilePathFinderOptionsSync>,
): ConfigFilePathFinderResultSync
{
  options ??= {};

  const cwd = resolveCWD(options.cwd);

  const configFilePathGlobPatterns = (
    options.filePath
      ? absolutifyPath(
          cwd,
          options.filePath,
        )
      : (
          options.globPattern
          ?? getConfigFilePathGlobPatterns()
        )
  );

  const configPackageJSONPropertyKeyPath = (
    options.packageJSONPropertyKeyPath
    ?? getConfigPackageJSONPropertyKeyPath()
  );

  const globSync = resolveFileSystemFunctionSync(
    "globSync",
    options.fs,
  );

  const readFileSync = resolveFileSystemFunctionSync(
    "readFileSync",
    options.fs,
  );

  let configFilePath: null | Path = null;

  let configDefinition: (
    | ConfigDefinition
    | ConfigDefinitionProviderSync
    | null
  ) = null;

  const rootPath = findRootPathSync(
    cwd,
    (candidatePath) =>
    {
      const dirents = globSync(
        configFilePathGlobPatterns,
        {
          cwd: candidatePath,
          withFileTypes: true,
        },
      );

      for (const dirent of dirents)
      {
        if (!dirent.isFile())
        {
          continue;
        }

        const direntFullPath = getDirentFullPath(dirent);

        if (dirent.name === "package.json")
        {
          const packageJSONFileContent = readFileSync(
            direntFullPath,
            "utf8",
          );

          const packageJSON = JSON.parse(
            packageJSONFileContent,
          ) as Record<string, unknown>;

          configDefinition = getValueByKeyPath(
            packageJSON,
            configPackageJSONPropertyKeyPath,
          ) ?? null;

          if (configDefinition != null)
          {
            configFilePath = direntFullPath;
            return true;
          }

          continue;
        }

        configFilePath = direntFullPath;
        return true;
      }

      return false;
    },
    {
      strategy: ROOT_PATH_FINDER_STRATEGY_INNERMOST,
    },
  );

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (configFilePath)
  {
    return {
      configDefinition,
      found: true,
      path: configFilePath,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      rootPath: rootPath!,
    };
  }

  return {
    configDefinition: null,
    found: false,
    packageJSON: null,
    path: null,
    rootPath: null,
  };
}
