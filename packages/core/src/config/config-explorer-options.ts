import { CONFIG_NAMESPACE } from "./config-namespace";
import { getDefaultConfigSearchPlaces } from "./config-search-places";

export type ConfigExplorerOptions = {
  cache?: boolean | null;
  namespace?: null | string;
  searchPlaces?: null | string[];
};

export type ConfigExplorerResolvedOptions = {
  cache: boolean;
  namespace: string;
  searchPlaces: string[];
};

export function resolveConfigExplorerOptions(
  options?: ConfigExplorerOptions | null,
): ConfigExplorerResolvedOptions
{
  options ??= {};

  const namespace = options.namespace ?? CONFIG_NAMESPACE;

  return {
    cache: options.cache ?? true,
    namespace,
    searchPlaces: (
      options.searchPlaces
      ?? getDefaultConfigSearchPlaces(namespace)
    ),
  };
}
