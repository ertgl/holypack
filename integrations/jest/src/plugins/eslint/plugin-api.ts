import {
  relative as getRelativePath,
  resolve as resolvePath,
} from "node:path";

import type { Linter } from "eslint";
import type ESLintPluginJestModule from "eslint-plugin-jest";
import type GlobalsModule from "globals";

import type { StrictContext } from "@holypack/core";
import { ModuleNotFoundError } from "@holypack/core/lib/module";
import { emitWarning } from "@holypack/core/plugins/process/plugins/warning-monitor/utils/warning-emitter";
import type { ResolvedProject } from "@holypack/core/plugins/project";
import { iterateProjectsRecursively } from "@holypack/core/plugins/project/utils/recursive-project-iterator";

import type { JestIntegrationESLintPlugin } from "./plugin";
import type {
  JestIntegrationESLintPluginOptions,
  JestIntegrationESLintPluginResolvedOptions,
} from "./plugin-options";
import { resolveJestIntegrationESLintPluginOptions } from "./plugin-options-resolver";

export class JestIntegrationESLintPluginAPI
{
  plugin: JestIntegrationESLintPlugin;

  constructor(
    plugin: JestIntegrationESLintPlugin,
  )
  {
    this.plugin = plugin;
  }

  async contributeGlobalsToESLintConfigs(
    context: StrictContext,
    configs: Linter.Config[],
    projects: ResolvedProject[],
    options: JestIntegrationESLintPluginResolvedOptions,
  ): Promise<void>
  {
    const packageName = "globals";

    let globals: null | typeof GlobalsModule = null;

    try
    {
      globals = await import(
        packageName,
      ) as typeof GlobalsModule;
    }
    catch (err)
    {
      const err2 = new ModuleNotFoundError(packageName);
      err2.cause = err;
      await emitWarning(context, err2);
    }

    if (globals == null)
    {
      return;
    }

    for (const project of projects)
    {
      configs.push({
        files: [
          ...options.testMatch.flatMap(
            (testPattern) =>
            {
              return [
                ...options.roots.map(
                  (rootPattern) =>
                  {
                    return resolvePath(
                      project.path,
                      rootPattern,
                      testPattern,
                    );
                  },
                ),
              ];
            },
          ).flatMap(
            (absoluteFilePath) =>
            {
              return getRelativePath(
                context.cwd,
                absoluteFilePath,
              );
            },
          ),
        ],
        languageOptions: {
          globals: {
            ...globals.jest,
          },
        },
      });

      for (const workspace of project.workspaces.values())
      {
        configs.push({
          files: [
            ...options.testMatch.flatMap(
              (testPattern) =>
              {
                return [
                  ...options.roots.map(
                    (rootPattern) =>
                    {
                      return resolvePath(
                        workspace.path,
                        rootPattern,
                        testPattern,
                      );
                    },
                  ),
                ];
              },
            ).flatMap(
              (absoluteFilePath) =>
              {
                return getRelativePath(
                  context.cwd,
                  absoluteFilePath,
                );
              },
            ),
          ],
          languageOptions: {
            globals: {
              ...globals.jest,
            },
          },
        });
      }
    }
  }

  async contributeJestConfigToESLintConfigs(
    context: StrictContext,
    configs: Linter.Config[],
    projects: ResolvedProject[],
    options: JestIntegrationESLintPluginResolvedOptions,
  ): Promise<void>
  {
    const packageName = "eslint-plugin-jest";

    let eslintPluginJest: null | typeof ESLintPluginJestModule = null;

    try
    {
      const eslintPluginJestModule = await import(
        packageName,
      ) as {
        default: typeof ESLintPluginJestModule;
      };

      eslintPluginJest = eslintPluginJestModule.default;
    }
    catch (err)
    {
      const err2 = new ModuleNotFoundError(packageName);
      err2.cause = err;
      await emitWarning(context, err2);
    }

    if (eslintPluginJest == null)
    {
      return;
    }

    for (const project of projects)
    {
      configs.push({
        ...eslintPluginJest.configs["flat/recommended"],
        files: [
          ...options.testMatch.flatMap(
            (testPattern) =>
            {
              return [
                ...options.roots.map(
                  (rootPattern) =>
                  {
                    return resolvePath(
                      project.path,
                      rootPattern,
                      testPattern,
                    );
                  },
                ),
              ];
            },
          ).flatMap(
            (absoluteFilePath) =>
            {
              return getRelativePath(
                context.cwd,
                absoluteFilePath,
              );
            },
          ),
        ],
      });

      for (const workspace of project.workspaces.values())
      {
        configs.push({
          ...eslintPluginJest.configs["flat/recommended"],
          files: [
            ...options.testMatch.flatMap(
              (testPattern) =>
              {
                return [
                  ...options.roots.map(
                    (rootPattern) =>
                    {
                      return resolvePath(
                        workspace.path,
                        rootPattern,
                        testPattern,
                      );
                    },
                  ),
                ];
              },
            ).flatMap(
              (absoluteFilePath) =>
              {
                return getRelativePath(
                  context.cwd,
                  absoluteFilePath,
                );
              },
            ),
          ],
        });
      }
    }
  }

  async contributeToESLintConfigs(
    context: StrictContext,
    configs: Linter.Config[],
    options?: boolean | JestIntegrationESLintPluginOptions | null,
  ): Promise<void>
  {
    const resolvedOptions = resolveJestIntegrationESLintPluginOptions(
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

    await this.contributeGlobalsToESLintConfigs(
      context,
      configs,
      projects,
      resolvedOptions,
    );

    await this.contributeJestConfigToESLintConfigs(
      context,
      configs,
      projects,
      resolvedOptions,
    );
  }
}
