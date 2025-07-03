import type { Config } from "jest";

import type { JestContext } from "../../../context/JestContext";
import type { JestIntegrationResolvedOptions } from "../../../options/JestIntegrationResolvedOptions";

export function configureJestTransformIgnorePatterns(
  jestContext: JestContext,
  options: JestIntegrationResolvedOptions,
  config: Config,
): void
{
  config.transformIgnorePatterns = (
    options.overrides.transformIgnorePatterns
    ?? Array.from(
      new Set([
        "dist/",
        "node_modules/",
      ]),
    )
  );
}
