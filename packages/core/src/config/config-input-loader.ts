import { resolveCWD } from "../plugins/cwd";

import type { ConfigInput } from "./config-input";
import type { ConfigInputLoaderOptions } from "./config-input-loader-options";
import { searchConfig } from "./config-searcher";

export async function loadConfigInput(
  options?: ConfigInputLoaderOptions | null,
): Promise<ConfigInput>
{
  options ??= {};

  const configFilePath = options.configFilePath ?? "";

  const cwd = resolveCWD(options.cwd);

  const configSearchResult = await searchConfig(
    cwd,
    {
      searchPlaces: (
        configFilePath !== ""
          ? [configFilePath]
          : undefined
      ),
    },
  );

  return configSearchResult.configInput ?? {};
}
