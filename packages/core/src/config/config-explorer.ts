import {
  cosmiconfig,
  defaultLoaders,
  type PublicExplorer,
} from "cosmiconfig";

import {
  type ConfigExplorerOptions,
  resolveConfigExplorerOptions,
} from "./config-explorer-options";

export type ConfigExplorer = PublicExplorer;

export function createConfigExplorer(
  options?: ConfigExplorerOptions | null,
): ConfigExplorer
{
  const resolvedOptions = resolveConfigExplorerOptions(options);

  return cosmiconfig(
    resolvedOptions.namespace,
    {
      cache: resolvedOptions.cache,
      loaders: {
        ".cts": defaultLoaders[".ts"],
        ".mts": defaultLoaders[".ts"],
        ...defaultLoaders,
      },
      packageProp: [resolvedOptions.namespace, "config"],
      searchPlaces: resolvedOptions.searchPlaces,
      searchStrategy: "project",
    },
  );
}
