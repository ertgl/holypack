import type { Config } from "./config";
import { loadConfigInput } from "./config-input-loader";
import type { ConfigLoaderOptions } from "./config-loader-options";
import { getCWD } from "./cwd";
import { _maybeAwait } from "./function-tools";

export async function loadConfig(
  options?: ConfigLoaderOptions | null,
): Promise<Config>
{
  options ??= {};

  const configFilePath = options.configFilePath ?? "";

  const cwd = options.cwd ?? getCWD();

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

    config = await _maybeAwait(configInput(configContext));
  }
  else
  {
    config = configInput;
  }

  return config;
}
