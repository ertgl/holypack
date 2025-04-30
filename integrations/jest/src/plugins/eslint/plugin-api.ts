import {
  relative as getRelativePath,
  resolve as resolvePath,
} from "node:path";

import type {
  ESLint,
  Linter,
} from "eslint";
import type ESLintPluginJestModule from "eslint-plugin-jest";
import type GlobalsModule from "globals";

import type { StrictContext } from "@holypack/core";
import { ModuleNotFoundError } from "@holypack/core/lib/module";
import { emitWarning } from "@holypack/core/plugins/process/plugins/warning-monitor/utils/warning-emitter";
import type { ResolvedProject } from "@holypack/core/plugins/project";
import { iterateWorkspacesRecursivelyByRootProject } from "@holypack/core/plugins/workspace/utils/recursive-workspace-iterator";

import type { JestIntegrationESLintPlugin } from "./plugin";
import { INTEGRATION_NAME_JEST_PLUGIN_ESLINT } from "./plugin-name";
import type {
  JestIntegrationESLintPluginOptions,
  JestIntegrationESLintPluginResolvedOptions,
} from "./plugin-options";
import { resolveJestIntegrationESLintPluginOptions } from "./plugin-options-resolver";

type ESLintPluginIstanbulModule = {
  configs: {
    recommended: Linter.Config;
  };
  rules: ESLint.Plugin["rules"];
};

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

    configs.push({
      files: [
        ...Array.from(
          iterateWorkspacesRecursivelyByRootProject(
            context.project as unknown as ResolvedProject,
            {
              excludeExternal: true,
            },
          ).map(
            (workspace) =>
            {
              return workspace.path;
            },
          ),
        ).flatMap(
          (workspacePath) =>
          {
            return [
              ...options.roots.flatMap(
                (rootPattern) =>
                {
                  return [
                    ...options.testMatch.flatMap(
                      (filePattern) =>
                      {
                        return [
                          getRelativePath(
                            context.cwd,
                            resolvePath(
                              workspacePath,
                              rootPattern,
                              filePattern,
                            ),
                          ),
                        ];
                      },
                    ),
                  ];
                },
              ),
            ];
          },
        ),
      ],
      languageOptions: {
        globals: {
          ...globals.jest,
        },
      },
      name: `${INTEGRATION_NAME_JEST_PLUGIN_ESLINT}#globals`,
    });
  }

  async contributeIstanbulConfigToESLintConfigs(
    context: StrictContext,
    configs: Linter.Config[],
    options: JestIntegrationESLintPluginResolvedOptions,
  ): Promise<void>
  {
    const packageName = "eslint-plugin-istanbul";

    let eslintPluginIstanbul: ESLintPluginIstanbulModule | null = null;

    try
    {
      const eslintPluginIstanbulModule = await import(
        packageName,
      ) as {
        default: ESLintPluginIstanbulModule;
      };

      eslintPluginIstanbul = eslintPluginIstanbulModule.default;
    }
    catch (err)
    {
      const err2 = new ModuleNotFoundError(packageName);
      err2.cause = err;
      await emitWarning(context, err2);
    }

    if (eslintPluginIstanbul == null)
    {
      return;
    }

    const {
      GLOB_PATTERN_CJS_CJSX_CTS_CTSX,
      GLOB_PATTERN_JS_JSX_TS_TSX,
      GLOB_PATTERN_MJS_MJSX_MTS_MTSX,
    } = await import("@holypack/integration-eslint/constants/glob-patterns");

    const files = [
      GLOB_PATTERN_CJS_CJSX_CTS_CTSX,
      GLOB_PATTERN_JS_JSX_TS_TSX,
      GLOB_PATTERN_MJS_MJSX_MTS_MTSX,
    ];

    configs.push({
      files: [
        ...Array.from(
          iterateWorkspacesRecursivelyByRootProject(
            context.project as unknown as ResolvedProject,
            {
              excludeExternal: true,
            },
          ).map(
            (workspace) =>
            {
              return workspace.path;
            },
          ),
        ).flatMap(
          (workspacePath) =>
          {
            return [
              ...files.map(
                (filePattern) =>
                {
                  return getRelativePath(
                    context.cwd,
                    resolvePath(
                      workspacePath,
                      filePattern,
                    ),
                  );
                },
              ),
            ];
          },
        ),
      ],
      name: `${INTEGRATION_NAME_JEST_PLUGIN_ESLINT}#istanbul`,
      plugins: {
        istanbul: eslintPluginIstanbul,
      },
      rules: eslintPluginIstanbul.configs.recommended.rules,
    });
  }

  async contributeJestConfigToESLintConfigs(
    context: StrictContext,
    configs: Linter.Config[],
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

    configs.push({
      files: [
        ...Array.from(
          iterateWorkspacesRecursivelyByRootProject(
            context.project as unknown as ResolvedProject,
            {
              excludeExternal: true,
            },
          ).map(
            (workspace) =>
            {
              return workspace.path;
            },
          ),
        ).flatMap(
          (workspacePath) =>
          {
            return [
              ...options.roots.flatMap(
                (rootPattern) =>
                {
                  return [
                    ...options.testMatch.flatMap(
                      (filePattern) =>
                      {
                        return [
                          getRelativePath(
                            context.cwd,
                            resolvePath(
                              workspacePath,
                              rootPattern,
                              filePattern,
                            ),
                          ),
                        ];
                      },
                    ),
                  ];
                },
              ),
            ];
          },
        ),
      ],
      name: `${INTEGRATION_NAME_JEST_PLUGIN_ESLINT}#config`,
      ...eslintPluginJest.configs["flat/recommended"],
    });
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

    await this.contributeGlobalsToESLintConfigs(
      context,
      configs,
      resolvedOptions,
    );

    await this.contributeJestConfigToESLintConfigs(
      context,
      configs,
      resolvedOptions,
    );

    await this.contributeIstanbulConfigToESLintConfigs(
      context,
      configs,
      resolvedOptions,
    );
  }
}
