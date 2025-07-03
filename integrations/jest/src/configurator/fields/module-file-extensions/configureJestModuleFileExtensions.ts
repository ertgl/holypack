import type { Config } from "jest";

import type { JestContext } from "../../../context/JestContext";
import type { JestIntegrationResolvedOptions } from "../../../options/JestIntegrationResolvedOptions";

export function configureJestModuleFileExtensions(
  jestContext: JestContext,
  options: JestIntegrationResolvedOptions,
  config: Config,
): void
{
  config.moduleFileExtensions = (
    options.overrides.moduleFileExtensions
    ?? [
      "ts",
      "js",
      "mts",
      "mjs",
      "cts",
      "cjs",
      "tsx",
      "jsx",
      "mtsx",
      "mjsx",
      "ctsx",
      "cjsx",
      "json",
      "node",
    ]
  );
}
