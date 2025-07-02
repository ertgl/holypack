import type { Config } from "jest";

import { resolvePath } from "@holypack/core/lib/path/resolvePath";

import type { JestContext } from "../../../context/JestContext";
import type { JestIntegrationResolvedOptions } from "../../../options/JestIntegrationResolvedOptions";

export function configureJestModuleDirectories(
  jestContext: JestContext,
  options: JestIntegrationResolvedOptions,
  config: Config,
): void
{
  config.moduleDirectories = (
    options.overrides.moduleDirectories
    ?? Array.from(
      new Set([
        jestContext.cwd,
        jestContext.project.path,
        jestContext.workspace.path,
      ]),
    ).map(
      (path) =>
      {
        return resolvePath(
          path,
          "node_modules",
        );
      },
    )
  );
}
