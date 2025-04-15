import { loadConfig } from "./config-loader";
import type { Context } from "./context";
import { getCWD } from "./cwd";

export type ContextResolutionOptions = {
  configFilePath?: null | string;
  cwd?: null | string;
};

export async function resolveContext(
  options?: ContextResolutionOptions | null,
): Promise<Context>
{
  options ??= {};

  const cwd = options.cwd ?? getCWD();

  const resolvedConfig = await loadConfig(
    options.configFilePath,
    {
      cwd,
    },
  );

  const context: Context = {
    config: resolvedConfig,
    cwd,
  };

  return context;
}
