import type { Config } from "jest";

import type { JestContext } from "../../../context/JestContext";
import type { JestIntegrationResolvedOptions } from "../../../options/JestIntegrationResolvedOptions";

import { getJestTestMatch } from "./getJestTestMatch";

export function configureJestTestMatch(
  jestContext: JestContext,
  options: JestIntegrationResolvedOptions,
  config: Config,
): void
{
  config.testMatch = (
    options.overrides.testMatch
    ?? getJestTestMatch(options)
  );
}
