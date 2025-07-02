import type { BabelIntegrationResolvedOptions } from "../../options/BabelIntegrationResolvedOptions";
import type { BabelBuildTarget } from "../BabelBuildTarget";

export function resolveBabelBuildTarget(
  options: BabelIntegrationResolvedOptions,
): BabelBuildTarget
{
  return {
    format: options.format,
  };
}
