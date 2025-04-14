import type {
  Config,
  ResolvedConfig,
} from "./config";
import type { ConfigContext } from "./config-context";
import type { ConfigInput } from "./config-input";
import { getCWD } from "./cwd";
import { _maybeAwait } from "./function-tools";

export type ConfigResolutionOptions = (
  & ConfigResolutionOptionsBaseProperties
  & ConfigResolutionOptionsCustomProperties
);

export type ConfigResolutionOptionsBaseProperties = {
  configInput?: ConfigInput | null;
  cwd?: null | string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ConfigResolutionOptionsCustomProperties {}

export async function resolveConfig(
  options?: ConfigResolutionOptions | null,
): Promise<ResolvedConfig>
{
  options ??= {};

  const configInput = options.configInput ?? {};

  let config: Config;

  if (typeof configInput === "function")
  {
    const cwd = options.cwd ?? getCWD();

    const configContext: ConfigContext = {
      cwd,
    };

    // TODO(ertgl): Do not ignore the unsafe-assignment warning here.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    config = await _maybeAwait(configInput(configContext));
  }
  else
  {
    config = configInput;
  }

  const resolvedConfig: ResolvedConfig = {};

  // TODO(ertgl): Handle the resolution of the config properties with plugins.
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  config;

  return resolvedConfig;
}
