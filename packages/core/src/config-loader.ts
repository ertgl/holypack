import type { ResolvedConfig } from "./config";
import {
  type ConfigResolutionOptions,
  resolveConfig,
} from "./config-resolution";
import { searchConfig } from "./config-searcher";

export async function loadConfig(
  configFilePath?: null | string,
  options?: null | Omit<ConfigResolutionOptions, "configInput">,
): Promise<ResolvedConfig>
{
  configFilePath ??= "";

  options ??= {};

  const configSearchResult = await searchConfig(
    null,
    {
      searchPlaces: (
        configFilePath !== ""
          ? [configFilePath]
          : undefined
      ),
    },
  );

  const resolvedConfig = await resolveConfig({
    ...options,
    configInput: configSearchResult.configInput,
  });

  return resolvedConfig;
}
