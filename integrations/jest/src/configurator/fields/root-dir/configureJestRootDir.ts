import type { Config } from "jest";

import type { JestContext } from "../../../context/JestContext";
import type { JestIntegrationResolvedOptions } from "../../../options/JestIntegrationResolvedOptions";

export function configureJestRootDir(
  jestContext: JestContext,
  options: JestIntegrationResolvedOptions,
  config: Config,
): void
{
  config.rootDir = options.overrides.rootDir ?? jestContext.cwd;
}
