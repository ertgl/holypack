import type { Linter } from "eslint";
import type ESLintPluginN from "eslint-plugin-n";

import { importDefaultExport } from "@holypack/core/lib/module/importDefaultExport";
import { suppressErrorMaybeAsync } from "@holypack/core/lib/runtime/suppressErrorMaybeAsync";

import { evaluateLinterConfigPredicates } from "../../../config/evaluateLinterConfigPredicates";
import { GLOB_PATTERN_CJS_CJSX_CTS_CTSX } from "../../../config/glob-patterns/GLOB_PATTERN_CJS_CJSX_CTS_CTSX";
import { GLOB_PATTERN_JS_JSX_TS_TSX } from "../../../config/glob-patterns/GLOB_PATTERN_JS_JSX_TS_TSX";
import { GLOB_PATTERN_MJS_MJSX_MTS_MTSX } from "../../../config/glob-patterns/GLOB_PATTERN_MJS_MJSX_MTS_MTSX";
import type { ESLintContext } from "../../../context/ESLintContext";
import type { ESLintIntegrationResolvedOptions } from "../../../options/ESLintIntegrationResolvedOptions";
import { LINTER_CONFIG_NAME_N_CUSTOM } from "../config/names/custom/LINTER_CONFIG_NAME_N_CUSTOM";
import { LINTER_CONFIG_NAME_N_RECOMMENDED_MODULE } from "../config/names/recommended-module/LINTER_CONFIG_NAME_N_RECOMMENDED_MODULE";
import { LINTER_CONFIG_NAME_N_RECOMMENDED_SCRIPT } from "../config/names/recommended-script/LINTER_CONFIG_NAME_N_RECOMMENDED_SCRIPT";
import { LINTER_CONFIG_NAME_N_RECOMMENDED } from "../config/names/recommended/LINTER_CONFIG_NAME_N_RECOMMENDED";
import { LINTER_CONFIG_NAME_N_SETTINGS } from "../config/names/settings/LINTER_CONFIG_NAME_N_SETTINGS";
import { PACKAGE_NAME_ESLINT_PLUGIN_N } from "../module/PACKAGE_NAME_ESLINT_PLUGIN_N";
import type { ESLintIntegrationPluginNResolvedOptions } from "../options/ESLintIntegrationPluginNResolvedOptions";

export async function configureESLintPluginNAsync(
  eslintContext: ESLintContext,
  eslintIntegrationOptions: ESLintIntegrationResolvedOptions,
  eslintIntegrationPluginOptions: ESLintIntegrationPluginNResolvedOptions,
  linterConfigArray: Linter.Config[],
): Promise<void>
{
  const {
    [LINTER_CONFIG_NAME_N_CUSTOM]: customConfigIndexes,
    [LINTER_CONFIG_NAME_N_RECOMMENDED]: recommendedConfigIndexes,
    [LINTER_CONFIG_NAME_N_RECOMMENDED_MODULE]: recommendedModuleConfigIndexes,
    [LINTER_CONFIG_NAME_N_RECOMMENDED_SCRIPT]: recommendedScriptConfigIndexes,
    [LINTER_CONFIG_NAME_N_SETTINGS]: settingsConfigIndexes,
  } = evaluateLinterConfigPredicates(
    linterConfigArray,
    {
      [LINTER_CONFIG_NAME_N_CUSTOM]: LINTER_CONFIG_NAME_N_CUSTOM,
      [LINTER_CONFIG_NAME_N_RECOMMENDED]: LINTER_CONFIG_NAME_N_RECOMMENDED,
      [LINTER_CONFIG_NAME_N_RECOMMENDED_MODULE]: LINTER_CONFIG_NAME_N_RECOMMENDED_MODULE,
      [LINTER_CONFIG_NAME_N_RECOMMENDED_SCRIPT]: LINTER_CONFIG_NAME_N_RECOMMENDED_SCRIPT,
      [LINTER_CONFIG_NAME_N_SETTINGS]: LINTER_CONFIG_NAME_N_SETTINGS,
    },
  );

  const settingsConfigExists = settingsConfigIndexes.size > 0;
  const recommendedConfigExists = recommendedConfigIndexes.size > 0;
  const recommendedModuleConfigExists = recommendedModuleConfigIndexes.size > 0;
  const recommendedScriptConfigExists = recommendedScriptConfigIndexes.size > 0;
  const customConfigExists = customConfigIndexes.size > 0;

  if (
    settingsConfigExists
    && recommendedConfigExists
    && recommendedModuleConfigExists
    && recommendedScriptConfigExists
    && customConfigExists
  )
  {
    return;
  }

  const pluginN = await suppressErrorMaybeAsync(
    importDefaultExport<typeof ESLintPluginN>,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    async (path: string) => await import(path),
    PACKAGE_NAME_ESLINT_PLUGIN_N,
  );

  if (pluginN == null)
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

  const rootDirPaths = new Set([
    eslintContext.cwd,
    eslintContext.project.path,
    eslintContext.workspace.path,
  ]);

  const dependencies: Set<string> = new Set();
  const devDependencies: Set<string> = new Set();

  if (eslintContext.project.workspace.packageJSON != null)
  {
    if (eslintContext.project.workspace.packageJSON.devDependencies != null)
    {
      for (const projectDevDependencyName of Object.keys(eslintContext.project.workspace.packageJSON.devDependencies as Record<string, string>))
      {
        devDependencies.add(projectDevDependencyName);
      }
    }
  }

  if (eslintContext.workspace.packageJSON != null)
  {
    if (eslintContext.workspace.packageJSON.dependencies != null)
    {
      for (const workspaceDependencyName of Object.keys(eslintContext.workspace.packageJSON.dependencies as Record<string, string>))
      {
        dependencies.add(workspaceDependencyName);
      }
    }

    if (eslintContext.workspace.packageJSON.devDependencies != null)
    {
      for (const workspaceDevDependencyName of Object.keys(eslintContext.workspace.packageJSON.devDependencies as Record<string, string>))
      {
        devDependencies.add(workspaceDevDependencyName);
      }
    }
  }

  for (const subWorkspace of eslintContext.subWorkspaces)
  {
    rootDirPaths.add(subWorkspace.path);

    if (subWorkspace.packageJSON != null)
    {
      if (subWorkspace.packageJSON.dependencies != null)
      {
        for (const subWorkspaceDependencyName of Object.keys(subWorkspace.packageJSON.dependencies as Record<string, string>))
        {
          dependencies.add(subWorkspaceDependencyName);
        }
      }

      if (subWorkspace.packageJSON.devDependencies != null)
      {
        for (const subWorkspaceDevDependencyName of Object.keys(subWorkspace.packageJSON.devDependencies as Record<string, string>))
        {
          devDependencies.add(subWorkspaceDevDependencyName);
        }
      }
    }
  }

  for (const workspace of eslintContext.workspaces)
  {
    rootDirPaths.add(workspace.path);

    if (workspace.packageJSON != null)
    {
      if (workspace.packageJSON.devDependencies != null)
      {
        for (const workspaceDevDependencyName of Object.keys(workspace.packageJSON.devDependencies as Record<string, string>))
        {
          devDependencies.add(workspaceDevDependencyName);
        }
      }
    }
  }

  const allowModules = Array.from(
    dependencies.union(
      devDependencies,
    ),
  );

  const sharedSettings = {
    allowModules,
    resolverConfig: {
      extensions,
      modules: ["node_modules"],
      roots: Array.from(rootDirPaths),
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

  if (!settingsConfigExists)
  {
    linterConfigArray.push({
      files: [
        GLOB_PATTERN_CJS_CJSX_CTS_CTSX,
        GLOB_PATTERN_JS_JSX_TS_TSX,
        GLOB_PATTERN_MJS_MJSX_MTS_MTSX,
      ],
      name: LINTER_CONFIG_NAME_N_SETTINGS,
      settings: {
        n: sharedSettings,
      },
    });
  }

  if (!recommendedConfigExists)
  {
    linterConfigArray.push({
      ...pluginN.configs["flat/recommended"],
      files: [
        GLOB_PATTERN_JS_JSX_TS_TSX,
      ],
      name: LINTER_CONFIG_NAME_N_RECOMMENDED,
    });
  }

  if (!recommendedModuleConfigExists)
  {
    linterConfigArray.push({
      ...pluginN.configs["flat/recommended-module"],
      files: [
        GLOB_PATTERN_MJS_MJSX_MTS_MTSX,
      ],
      name: LINTER_CONFIG_NAME_N_RECOMMENDED_MODULE,
    });
  }

  if (!recommendedScriptConfigExists)
  {
    linterConfigArray.push({
      ...pluginN.configs["flat/recommended-script"],
      files: [
        GLOB_PATTERN_CJS_CJSX_CTS_CTSX,
      ],
      name: LINTER_CONFIG_NAME_N_RECOMMENDED_SCRIPT,
    });
  }

  if (!customConfigExists)
  {
    // TODO(ertgl): Implement `PackageJSONPropertyFinder` and look for values by falling back to parent workspaces, for supporting limitless depths.

    const nodeVersionConstraint = (
      (eslintContext.workspace.packageJSON?.engines as Record<string, string> | undefined)?.node
      || (eslintContext.project.workspace.packageJSON?.engines as Record<string, string> | undefined)?.node
      || ">=22.17.0" // LTS
    );

    linterConfigArray.push({
      files: [
        GLOB_PATTERN_CJS_CJSX_CTS_CTSX,
        GLOB_PATTERN_JS_JSX_TS_TSX,
        GLOB_PATTERN_MJS_MJSX_MTS_MTSX,
      ],
      name: LINTER_CONFIG_NAME_N_CUSTOM,
      rules: {
        "n/hashbang": "off",
        "n/no-extraneous-import": [
          "warn",
          {
            allowModules,
          },
        ],
        "n/no-extraneous-require": [
          "warn",
          {
            allowModules,
          },
        ],
        // It seems that `eslint-plugin-n` does not support barrel files well.
        /**
         * @see https://github.com/eslint-community/eslint-plugin-n/issues/349
         */
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
        "n/no-unsupported-features/node-builtins": [
          "error",
          {
            version: nodeVersionConstraint,
          },
        ],
        "n/prefer-node-protocol": "warn",
      },
    });
  }
}
