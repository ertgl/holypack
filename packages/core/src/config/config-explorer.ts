import {
  cosmiconfig,
  cosmiconfigSync,
  defaultLoaders,
  defaultLoadersSync,
  type PublicExplorer,
  type PublicExplorerSync,
} from "cosmiconfig";

import {
  type ConfigExplorerOptions,
  resolveConfigExplorerOptions,
} from "./config-explorer-options";

export type ConfigExplorer = PublicExplorer;

export type ConfigSyncExplorer = PublicExplorerSync;

export function createConfigExplorer(
  options?: ConfigExplorerOptions | null,
): ConfigExplorer
{
  const resolvedOptions = resolveConfigExplorerOptions(options);

  return cosmiconfig(
    resolvedOptions.namespace,
    {
      loaders: {
        ".cts": defaultLoaders[".ts"],
        ".mts": defaultLoaders[".ts"],
        ...defaultLoaders,
      },
      packageProp: [resolvedOptions.namespace, "config"],
      searchPlaces: resolvedOptions.searchPlaces,
    },
  );
}

export function createConfigSyncExplorer(
  options?: ConfigExplorerOptions | null,
): ConfigSyncExplorer
{
  const resolvedOptions = resolveConfigExplorerOptions(options);

  return cosmiconfigSync(
    resolvedOptions.namespace,
    {
      loaders: {
        ".cts": defaultLoadersSync[".ts"],
        ...defaultLoadersSync,
      },
      packageProp: [resolvedOptions.namespace, "config"],
      searchPlaces: resolvedOptions.searchPlaces,
    },
  );
}
