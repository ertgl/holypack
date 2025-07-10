import type { BabelConfiguratorResolvedOptions } from "../../configurator/options/BabelConfiguratorResolvedOptions";
import type { BabelBuild } from "../BabelBuild";

import { resolveBabelBuildTarget } from "./resolveBabelBuildTarget";

export function resolveBabelBuild(
  options: BabelConfiguratorResolvedOptions,
): BabelBuild
{
  return {
    target: resolveBabelBuildTarget(options),
  };
}
