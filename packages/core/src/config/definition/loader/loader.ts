import { resolveCWD } from "../../../lib/process/cwd";
import type { ConfigDefinition } from "../../definition";
import { searchConfig } from "../../explorer";

import type { ConfigDefinitionLoaderOptions } from "./options";

export async function loadConfigDefinition(
  options?: ConfigDefinitionLoaderOptions | null,
): Promise<ConfigDefinition>
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

  return configSearchResult.configDefinition ?? {};
}
