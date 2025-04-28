import {
  relative as getRelativePath,
  join as joinPaths,
  resolve as resolvePath,
} from "node:path";

import type { Linter } from "eslint";

import type { StrictContext } from "@holypack/core";
import type { ResolvedProject } from "@holypack/core/plugins/project";
import { iterateProjectsRecursively } from "@holypack/core/plugins/project/utils/recursive-project-iterator";

import type { ESLintIntegrationIgnoresPlugin } from "./plugin";
import type { ESLintIntegrationIgnoresPluginOptions } from "./plugin-options";
import { resolveESLintIntegrationIgnoresPluginOptions } from "./plugin-options-resolver";

export class ESLintIntegrationIgnoresPluginAPI
{
  plugin: ESLintIntegrationIgnoresPlugin;

  constructor(
    plugin: ESLintIntegrationIgnoresPlugin,
  )
  {
    this.plugin = plugin;
  }

  contributeToESLintConfigs(
    context: StrictContext,
    configs: Linter.Config[],
    options?: boolean | ESLintIntegrationIgnoresPluginOptions | null,
  ): void
  {
    const resolvedOptions = resolveESLintIntegrationIgnoresPluginOptions(
      context.cwd,
      options,
    );

    if (resolvedOptions === false)
    {
      return;
    }

    const projects = (
      context.project != null
        ? Array.from(
            iterateProjectsRecursively(
              context.project as unknown as ResolvedProject,
              {
                includeSelf: true,
              },
            ),
          )
        : []
    );

    for (const project of projects)
    {
      configs.push(
        {
          ignores: [
            ...resolvedOptions.commonDirectoryPatterns.map(
              (commonDirectoryPattern) =>
              {
                return resolvePath(project.path, commonDirectoryPattern);
              },
            ).flatMap(
              (absoluteIgnorePath) =>
              {
                return joinPaths(
                  getRelativePath(
                    context.cwd,
                    absoluteIgnorePath,
                  ),
                  "**",
                  "*",
                );
              },
            ),

            ...resolvedOptions.commonFilePatterns.map(
              (commonFilePattern) =>
              {
                return resolvePath(project.path, commonFilePattern);
              },
            ).flatMap(
              (absoluteIgnorePath) =>
              {
                return joinPaths(
                  getRelativePath(
                    context.cwd,
                    absoluteIgnorePath,
                  ),
                );
              },
            ),
          ],
        },

        {
          ignores: Array.from(
            project.workspaces.values().flatMap(
              (workspace) =>
              {
                return [
                  ...resolvedOptions.commonDirectoryPatterns.map(
                    (commonDirectoryPattern) =>
                    {
                      return resolvePath(workspace.path, commonDirectoryPattern);
                    },
                  ).flatMap(
                    (absoluteIgnorePath) =>
                    {
                      return joinPaths(
                        getRelativePath(
                          context.cwd,
                          absoluteIgnorePath,
                        ),
                        "**",
                        "*",
                      );
                    },
                  ),

                  ...resolvedOptions.commonFilePatterns.map(
                    (commonFilePattern) =>
                    {
                      return resolvePath(workspace.path, commonFilePattern);
                    },
                  ).flatMap(
                    (absoluteIgnorePath) =>
                    {
                      return joinPaths(
                        getRelativePath(
                          context.cwd,
                          absoluteIgnorePath,
                        ),
                      );
                    },
                  ),
                ];
              },
            ),
          ),
        },
      );
    }
  }
}
