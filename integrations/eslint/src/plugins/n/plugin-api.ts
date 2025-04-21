import { join as joinPaths } from "node:path";

import type NPluginModule from "eslint-plugin-n";

import type { ResolvedContext } from "@holypack/core";

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
    options?: boolean | ESLintIntegrationNPluginOptions | null,
  ): Promise<void>
  {
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
      // TODO(ertgl): Standardize the missing package error handling.
      const err2 = new Error(`Package could not be imported: ${packageName}`);
      err2.cause = err;
      process.emitWarning(err2);
    }

    if (nodePlugin == null)
    {
      return;
    }

    const resolvedOptions = resolveESLintIntegrationNPluginOptions(
      context.cwd,
      options,
    );

    if (resolvedOptions === false)
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

    // TODO(ertgl): Create `WorkspacePlugin` for resolving current workspace root.
    const rootDirPaths = Array.from(
      new Set([
        context.cwd,
        context.project.path,
      ]),
    );

    const sharedSettings = {
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

    context.eslint.config.push(
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
