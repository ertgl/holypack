import type { BabelIntegrationResolvedOptions } from "../../options/BabelIntegrationResolvedOptions";
import type { BabelContext } from "../BabelContext";

import { resolveBabelBuild } from "./resolveBabelBuild";
import { resolveBabelEnv } from "./resolveBabelEnv";

export function resolveBabelContext(
  options: BabelIntegrationResolvedOptions,
): BabelContext
{
  return {
    build: resolveBabelBuild(options),
    env: resolveBabelEnv(),
  };
}
