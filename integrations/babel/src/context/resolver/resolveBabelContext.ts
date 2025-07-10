import type { BabelConfiguratorResolvedOptions } from "../../configurator/options/BabelConfiguratorResolvedOptions";
import type { BabelContext } from "../BabelContext";

import { resolveBabelBuild } from "./resolveBabelBuild";
import { resolveBabelEnv } from "./resolveBabelEnv";

export function resolveBabelContext(
  options: BabelConfiguratorResolvedOptions,
): BabelContext
{
  return {
    build: resolveBabelBuild(options),
    env: resolveBabelEnv(),
  };
}
