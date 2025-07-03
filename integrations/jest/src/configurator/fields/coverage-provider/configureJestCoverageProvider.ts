import type { Config } from "jest";

import type { JestContext } from "../../../context/JestContext";
import type { JestIntegrationResolvedOptions } from "../../../options/JestIntegrationResolvedOptions";

export function configureJestCoverageProvider(
  jestContext: JestContext,
  options: JestIntegrationResolvedOptions,
  config: Config,
): void
{
  config.coverageProvider = options.overrides.coverageProvider ?? "babel";
}
