import type { Config } from "jest";

import type { JestContext } from "../../../context/JestContext";
import type { JestIntegrationResolvedOptions } from "../../../options/JestIntegrationResolvedOptions";

export function configureJestModulePaths(
  jestContext: JestContext,
  options: JestIntegrationResolvedOptions,
  config: Config,
): void
{
  config.modulePaths = (
    options.overrides.modulePaths
    ?? ["<rootDir>"]
  );
}
