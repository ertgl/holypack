import { promisify } from "node:util";

import type { Dirent } from "../../lib/fs/dirent/Dirent";
import { getDirentFullPath } from "../../lib/fs/dirent/getDirentFullPath";
import { resolveFileSystemFunctionAsync } from "../../lib/fs/resolveFileSystemFunctionAsync";
import { getValueByKeyPath } from "../../lib/object/getValueByKeyPath";
import type { Optional } from "../../lib/object/Optional";
import { absolutifyPath } from "../../lib/path/absolutifyPath";
import type { Path } from "../../lib/path/Path";
import { findRootPathAsync } from "../../lib/path/rooter/findRootPathAsync";
import { ROOT_PATH_FINDER_STRATEGY_INNERMOST } from "../../lib/path/rooter/ROOT_PATH_FINDER_STRATEGY_INNERMOST";
import { resolveCWD } from "../../lib/process/cwd/resolveCWD";
import type { ConfigDefinition } from "../definition/ConfigDefinition";
import type { ConfigDefinitionProviderMaybeAsync } from "../provider/ConfigDefinitionProviderMaybeAsync";

import type { ConfigFilePathFinderOptionsAsync } from "./ConfigFilePathFinderOptionsAsync";
import type { ConfigFilePathFinderResultAsync } from "./ConfigFilePathFinderResultAsync";
import { getConfigFilePathGlobPatterns } from "./getConfigFilePathGlobPatterns";
import { getConfigPackageJSONPropertyKeyPath } from "./getConfigPackageJSONPropertyKeyPath";

export async function findConfigFilePathAsync(
  options?: Optional<ConfigFilePathFinderOptionsAsync>,
): Promise<ConfigFilePathFinderResultAsync>
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

  const glob = await resolveFileSystemFunctionAsync(
    "glob",
    options.fs,
  );

  const globPromisified = promisify<
    Parameters<typeof glob>[0],
    Parameters<typeof glob>[1],
    Parameters<Parameters<typeof glob>[2]>[1]
  >(glob);

  let configFilePath: null | Path = null;

  let configDefinition: (
    | ConfigDefinition
    | ConfigDefinitionProviderMaybeAsync
    | null
  ) = null;

  const rootPath = await findRootPathAsync(
    cwd,
    async (candidatePath) =>
    {
      const dirents = await globPromisified(
        configFilePathGlobPatterns,
        {
          cwd: candidatePath,
          withFileTypes: true,
        },
      ) as Dirent[];

      for (const dirent of dirents)
      {
        if (!dirent.isFile())
        {
          continue;
        }

        const direntFullPath = getDirentFullPath(dirent);

        if (dirent.name === "package.json")
        {
          const readFile = await resolveFileSystemFunctionAsync(
            "readFile",
            options.fs,
          );

          const readFilePromisified = promisify(readFile);

          const packageJSONFileContent = await readFilePromisified(
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
