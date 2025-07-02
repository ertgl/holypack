import type { Config } from "jest";

import type { JestContext } from "../../../context/JestContext";
import type { JestIntegrationResolvedOptions } from "../../../options/JestIntegrationResolvedOptions";

export function configureJestExtensionsToTreatAsEsm(
  jestContext: JestContext,
  options: JestIntegrationResolvedOptions,
  config: Config,
): void
{
  config.extensionsToTreatAsEsm = (
    options.overrides.extensionsToTreatAsEsm
    ?? [
      ".ts",
      ".mts",
      ".tsx",
      ".jsx",
      ".mtsx",
      ".mjsx",
    ]
  );
}
