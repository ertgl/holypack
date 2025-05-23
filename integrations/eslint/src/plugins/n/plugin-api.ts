import { join as joinPaths } from "node:path";

import type { Linter } from "eslint";
import type NPluginModule from "eslint-plugin-n";

import type { StrictContext } from "@holypack/core";
import { ModuleNotFoundError } from "@holypack/core/lib/module";
import { emitWarning } from "@holypack/core/plugins/process/sub-plugins/warning-monitor/utils/warning-emitter";
import type { ResolvedProject } from "@holypack/core/plugins/project";
import { iterateWorkspacesRecursivelyByRootProject } from "@holypack/core/plugins/workspace/utils/recursive-workspace-iterator";

import {
  GLOB_PATTERN_CJS_CJSX_CTS_CTSX,
  GLOB_PATTERN_JS_JSX_TS_TSX,
  GLOB_PATTERN_MJS_MJSX_MTS_MTSX,
} from "../../constants/glob-patterns";

import type { ESLintIntegrationNPlugin } from "./plugin";
import type { ESLintIntegrationNPluginOptions } from "./plugin-options";
import { resolveESLintIntegrationNPluginOptions } from "./plugin-options-resolver";

export class ESLintIntegrationNPluginAPI
{
  plugin: ESLintIntegrationNPlugin;

  constructor(
    plugin: ESLintIntegrationNPlugin,
  )
  {
    this.plugin = plugin;
  }

  async contributeToESLintConfigs(
    context: StrictContext,
    configs: Linter.Config[],
    options?: boolean | ESLintIntegrationNPluginOptions | null,
  ): Promise<void>
  {
    const resolvedOptions = resolveESLintIntegrationNPluginOptions(
      context.cwd,
      options,
    );

    if (resolvedOptions === false)
    {
      return;
    }

    const packageName = "eslint-plugin-n";

    let nodePlugin: null | typeof NPluginModule = null;

    try
    {
      const nodePluginModule = await import(
        packageName,
      ) as {
        default: typeof NPluginModule;
      };

      nodePlugin = nodePluginModule.default;
    }
    catch (err)
    {
      const err2 = new ModuleNotFoundError(packageName);
      err2.cause = err;
      await emitWarning(context, err2);
    }

    if (nodePlugin == null)
    {
      return;
    }

    const project = context.project as unknown as ResolvedProject;

    const extensions = [
      ".ts",
      ".tsx",
      ".js",
      ".jsx",
      ".mts",
      ".mtsx",
      ".mjs",
      ".mjsx",
      ".cts",
      ".ctsx",
      ".cjsx",
      ".cjs",
      ".node",
      ".json",
    ];

    const rootDirPaths = Array.from(
      new Set([
        context.cwd,
        project.path,
      ]),
    );

    const sharedSettings = {
      allowModules: Array.from(
        new Set(
          Object.keys(
            project.packageJSON.dependencies ?? {},
          ),
        ).union(
          new Set(
            Object.keys(
              project.packageJSON.devDependencies ?? {},
            ),
          ),
        ).union(
          new Set(
            iterateWorkspacesRecursivelyByRootProject(
              context.project as unknown as ResolvedProject,
              {
                excludeExternal: true,
              },
            ).flatMap(
              (workspace) =>
              {
                return [
                  ...Object.keys(workspace.packageJSON.dependencies ?? {}),
                  ...Object.keys(workspace.packageJSON.devDependencies ?? {}),
                ];
              },
            ),
          ),
        ),
      ),
      resolverConfig: {
        extensions,
        modules: [
          "node_modules",
          joinPaths(project.path, "node_modules"),
        ],
        roots: rootDirPaths,
      },
      tryExtensions: extensions,
      typescriptExtensionMap: [
        ["", ".js"],
        [".ts", ".js"],
        [".tsx", ".js"],
        [".mts", ".mjs"],
        [".mtsx", ".mjs"],
        [".cts", ".cjs"],
        [".ctsx", ".cjs"],
      ],
    };

    configs.push(
      {
        files: [
          GLOB_PATTERN_CJS_CJSX_CTS_CTSX,
          GLOB_PATTERN_JS_JSX_TS_TSX,
          GLOB_PATTERN_MJS_MJSX_MTS_MTSX,
        ],
        settings: {
          n: sharedSettings,
        },
      },

      {
        ...nodePlugin.configs["flat/recommended"],
        files: [
          GLOB_PATTERN_JS_JSX_TS_TSX,
        ],
      },

      {
        ...nodePlugin.configs["flat/recommended-module"],
        files: [
          GLOB_PATTERN_MJS_MJSX_MTS_MTSX,
        ],
      },

      {
        ...nodePlugin.configs["flat/recommended-script"],
        files: [
          GLOB_PATTERN_CJS_CJSX_CTS_CTSX,
        ],
      },

      {
        files: [
          GLOB_PATTERN_CJS_CJSX_CTS_CTSX,
          GLOB_PATTERN_JS_JSX_TS_TSX,
          GLOB_PATTERN_MJS_MJSX_MTS_MTSX,
        ],
        rules: {
          "n/hashbang": "off",
          // It seems that `eslint-plugin-n` does not support barrel files well.
          // So, we have to disable `n/no-missing-import` rule for now.
          // See: https://github.com/eslint-community/eslint-plugin-n/issues/349
          // And no, barrel files are not bad, when managed correctly.
          "n/no-missing-import": "off",
          "n/no-missing-require": [
            "error",
            sharedSettings,
          ],
          "n/no-unpublished-import": [
            "error",
            {
              ignoreTypeImport: true,
            },
          ],
          "n/prefer-node-protocol": "warn",
        },
      },
    );
  }
}
