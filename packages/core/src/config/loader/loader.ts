import { resolveCWD } from "../../lib/process/cwd";
import { maybeAwait } from "../../lib/promise";
import type { Config } from "../config";
import { loadConfigDefinition } from "../definition";
import { isConfigProviderFunction } from "../provider";

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
    ?? loadConfigDefinition(
      {
        configFilePath,
        cwd,
      },
    )
  );

  let config: Config;

  if (isConfigProviderFunction(configDefinition))
  {
    const configProviderContext = {
      cwd,
      ...options.configProviderContext,
    };

    config = await maybeAwait(configDefinition(configProviderContext));
  }
  else
  {
    config = configDefinition as Config;
  }

  return config;
}
