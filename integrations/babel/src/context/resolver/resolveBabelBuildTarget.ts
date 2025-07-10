import type { BabelConfiguratorResolvedOptions } from "../../configurator/options/BabelConfiguratorResolvedOptions";
import type { BabelBuildTarget } from "../BabelBuildTarget";

export function resolveBabelBuildTarget(
  options: BabelConfiguratorResolvedOptions,
): BabelBuildTarget
{
  return {
    format: options.format,
  };
}
