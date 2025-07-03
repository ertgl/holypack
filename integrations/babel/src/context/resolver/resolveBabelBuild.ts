import type { BabelIntegrationResolvedOptions } from "../../options/BabelIntegrationResolvedOptions";
import type { BabelBuild } from "../BabelBuild";

import { resolveBabelBuildTarget } from "./resolveBabelBuildTarget";

export function resolveBabelBuild(
  options: BabelIntegrationResolvedOptions,
): BabelBuild
{
  return {
    target: resolveBabelBuildTarget(options),
  };
}
