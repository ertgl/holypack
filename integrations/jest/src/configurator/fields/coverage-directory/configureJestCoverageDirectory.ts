import type { Config } from "jest";

import { resolvePath } from "@holypack/core/lib/path/resolvePath";

import type { JestContext } from "../../../context/JestContext";
import type { JestIntegrationResolvedOptions } from "../../../options/JestIntegrationResolvedOptions";

export function configureJestCoverageDirectory(
  jestContext: JestContext,
  options: JestIntegrationResolvedOptions,
  config: Config,
): void
{
  config.coverageDirectory = (
    options.overrides.coverageDirectory
    ?? resolvePath(jestContext.cwd, ".coverage")
  );
}
