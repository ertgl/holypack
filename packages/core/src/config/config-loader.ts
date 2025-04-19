import { resolveCWD } from "../utils/process/cwd";
import { maybeAwait } from "../utils/promise";

import type { Config } from "./config";
import { loadConfigInput } from "./config-input-loader";
import type { ConfigLoaderOptions } from "./config-loader-options";

export async function loadConfig(
  options?: ConfigLoaderOptions | null,
): Promise<Config>
{
  options ??= {};

  const configFilePath = options.configFilePath ?? "";

  const cwd = resolveCWD(options.cwd);

  const configInput = (
    options.configInput
    ?? loadConfigInput(
      {
        configFilePath,
        cwd,
      },
    )
  );

  let config: Config;

  if (typeof configInput === "function")
  {
    const configContext = {
      cwd,
      ...options.configContext,
    };

    config = await maybeAwait(configInput(configContext));
  }
  else
  {
    config = configInput as Config;
  }

  return config;
}
