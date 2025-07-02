import type { Config } from "jest";

import type { JestContext } from "../../../context/JestContext";
import type { JestIntegrationResolvedOptions } from "../../../options/JestIntegrationResolvedOptions";

export function configureJestRoots(
  jestContext: JestContext,
  options: JestIntegrationResolvedOptions,
  config: Config,
): void
{
  if (options.overrides.roots != null)
  {
    config.roots = options.overrides.roots;
    return;
  }

  const roots: string[] = [];

  if (jestContext.paths.src != null)
  {
    roots.push("<rootDir>/src");
  }

  if (jestContext.paths.test != null)
  {
    roots.push("<rootDir>/test");
  }

  config.roots = roots;
}
