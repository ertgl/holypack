import { resolveCWD } from "../../../lib/process/cwd";
import { maybeAwait } from "../../../lib/promise";
import type { Config } from "../../config";
import { isConfigProviderFunction } from "../../provider";

import type { ConfigDefinitionResolutionOptions } from "./options";

export async function resolveConfigDefinition(
  options?: ConfigDefinitionResolutionOptions | null,
): Promise<Config>
{
  options ??= {};

  const cwd = resolveCWD(options.cwd);

  const configDefinition = (
    options.configDefinition
    ?? {}
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
    config = configDefinition;
  }

  return config;
}
