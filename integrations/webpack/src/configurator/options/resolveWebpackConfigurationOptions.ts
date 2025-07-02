import type { WebpackConfigurationOptions } from "./WebpackConfigurationOptions";
import type { WebpackConfigurationResolvedOptions } from "./WebpackConfigurationResolvedOptions";

export function resolveWebpackConfigurationOptions(
  options?: null | WebpackConfigurationOptions,
): WebpackConfigurationResolvedOptions
{
  return {
    overrides: options?.overrides ?? {},
  };
}
