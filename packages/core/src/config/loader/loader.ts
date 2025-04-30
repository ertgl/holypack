import { resolveCWD } from "../../lib/process/cwd";
import type { Config } from "../config";
import {
  loadConfigDefinition,
  resolveConfigDefinition,
} from "../definition";

import type { ConfigLoaderOptions } from "./options";

export async function loadConfig(
  options?: ConfigLoaderOptions | null,
): Promise<Config>
{
  options ??= {};

  const configFilePath = options.configFilePath ?? "";

  const cwd = resolveCWD(options.cwd);

  const configDefinition = (
    options.configDefinition
    ?? await loadConfigDefinition(
      {
        configFilePath,
        cwd,
      },
    )
  );

  return await resolveConfigDefinition(
    {
      configDefinition,
      configProviderContext: options.configProviderContext,
      cwd,
    },
  );
}
