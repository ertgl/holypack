import { join as joinPaths } from "node:path";

import type { Linter } from "eslint";
import type NPluginModule from "eslint-plugin-n";

import type { ResolvedContext } from "@holypack/core";
import { emitWarning } from "@holypack/core/context/warnings";
import { ModuleNotFoundError } from "@holypack/core/module";

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

  async addESLintConfig(
    context: ResolvedContext,
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
        context.project.path,
      ]),
    );

    const sharedSettings = {
      allowModules: Array.from(
        new Set([
          ...Object.keys(context.project.packageJSON.dependencies ?? {}),
          ...Object.keys(context.project.packageJSON.devDependencies ?? {}),
        ]),
      ),
      resolverConfig: {
        extensions,
        modules: [
          "node_modules",
          joinPaths(context.project.path, "node_modules"),
        ],
        roots: rootDirPaths,
      },
      tryExtensions: extensions,
      typescriptExtensionMap: [
        ["", ".js"],
        [".ts", ".js"],
        [".tsx", ".js"],
        [".mts", ".mjs"],
        [".mtsx", ".mjsx"],
        [".cts", ".cjs"],
        [".ctsx", ".cjsx"],
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
          // It seems that `eslint-plugin-n` does not support barrel files well.
          // So, we have to disable `n/no-missing-import` rule for now.
          // See: https://github.com/eslint-community/eslint-plugin-n/issues/349
          // And no, barrel files are not bad, when managed correctly.
          "n/no-missing-import": "off",
          "n/no-missing-require": [
            "error",
            sharedSettings,
          ],
          "n/prefer-node-protocol": "warn",
        },
      },
    );
  }
}
