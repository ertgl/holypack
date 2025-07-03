import type { Config } from "jest";

import type { JestContext } from "../../../context/JestContext";
import type { JestIntegrationResolvedOptions } from "../../../options/JestIntegrationResolvedOptions";

export function configureJestTestRegex(
  jestContext: JestContext,
  options: JestIntegrationResolvedOptions,
  config: Config,
): void
{
  if (
    options.overrides.testRegex == null
    && config.testMatch != null
  )
  {
    return;
  }

  config.testRegex = (
    options.overrides.testRegex
    ?? [
      /\.(?:spec|test)\.(?:[cm]?[jt]s[x]?)$/iu.source,
    ]
  );
}
