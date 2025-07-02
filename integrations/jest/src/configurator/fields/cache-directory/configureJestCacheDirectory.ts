import type { Config } from "jest";

import { resolvePath } from "@holypack/core/lib/path/resolvePath";

import type { JestContext } from "../../../context/JestContext";
import type { JestIntegrationResolvedOptions } from "../../../options/JestIntegrationResolvedOptions";

export function configureJestCacheDirectory(
  jestContext: JestContext,
  options: JestIntegrationResolvedOptions,
  config: Config,
): void
{
  // TODO(ertgl): Standardize root directory for caches.

  config.cacheDirectory = (
    options.overrides.cacheDirectory
    ?? resolvePath(jestContext.cwd, ".cache", "jest")
  );
}
