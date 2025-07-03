import type { Linter } from "eslint";
import type { createTypeScriptImportResolver as TypeScriptImportResolverCreatorFunction } from "eslint-import-resolver-typescript";
import type ESLintPluginImportX from "eslint-plugin-import-x";
import type { Resolver } from "eslint-plugin-import-x";
import escapeRegExp from "lodash.escaperegexp";

import { importDefaultExport } from "@holypack/core/lib/module/importDefaultExport";
import { suppressErrorMaybeAsync } from "@holypack/core/lib/runtime/suppressErrorMaybeAsync";

import { evaluateLinterConfigPredicates } from "../../../config/evaluateLinterConfigPredicates";
import { GLOB_PATTERN_CJS_CJSX_CTS_CTSX } from "../../../config/glob-patterns/GLOB_PATTERN_CJS_CJSX_CTS_CTSX";
import { GLOB_PATTERN_CTS_MTS_TS } from "../../../config/glob-patterns/GLOB_PATTERN_CTS_MTS_TS";
import { GLOB_PATTERN_CTSX_MTSX_TSX } from "../../../config/glob-patterns/GLOB_PATTERN_CTSX_MTSX_TSX";
import { GLOB_PATTERN_JS_JSX_TS_TSX } from "../../../config/glob-patterns/GLOB_PATTERN_JS_JSX_TS_TSX";
import { GLOB_PATTERN_MJS_MJSX_MTS_MTSX } from "../../../config/glob-patterns/GLOB_PATTERN_MJS_MJSX_MTS_MTSX";
import type { ESLintContext } from "../../../context/ESLintContext";
import type { ESLintIntegrationResolvedOptions } from "../../../options/ESLintIntegrationResolvedOptions";
import { LINTER_CONFIG_NAME_IMPORT_X_CUSTOM } from "../config/names/custom/LINTER_CONFIG_NAME_IMPORT_X_CUSTOM";
import { LINTER_CONFIG_NAME_IMPORT_X_RECOMMENDED } from "../config/names/recommended/LINTER_CONFIG_NAME_IMPORT_X_RECOMMENDED";
import { LINTER_CONFIG_NAME_IMPORT_X_SETTINGS } from "../config/names/settings/LINTER_CONFIG_NAME_IMPORT_X_SETTINGS";
import { LINTER_CONFIG_NAME_IMPORT_X_TYPESCRIPT } from "../config/names/typescript/LINTER_CONFIG_NAME_IMPORT_X_TYPESCRIPT";
import { PACKAGE_NAME_ESLINT_IMPORT_RESOLVER_TYPESCRIPT } from "../module/PACKAGE_NAME_ESLINT_IMPORT_RESOLVER_TYPESCRIPT";
import { PACKAGE_NAME_ESLINT_PLUGIN_IMPORT_X } from "../module/PACKAGE_NAME_ESLINT_PLUGIN_IMPORT_X";
import type { ESLintIntegrationPluginImportXResolvedOptions } from "../options/ESLintIntegrationPluginImportXResolvedOptions";

export async function configureESLintPluginImportXAsync(
  eslintContext: ESLintContext,
  eslintIntegrationOptions: ESLintIntegrationResolvedOptions,
  eslintIntegrationPluginOptions: ESLintIntegrationPluginImportXResolvedOptions,
  linterConfigArray: Linter.Config[],
): Promise<void>
{
  const {
    [LINTER_CONFIG_NAME_IMPORT_X_CUSTOM]: customConfigIndexes,
    [LINTER_CONFIG_NAME_IMPORT_X_RECOMMENDED]: recommendedConfigIndexes,
    [LINTER_CONFIG_NAME_IMPORT_X_SETTINGS]: settingsConfigIndexes,
    [LINTER_CONFIG_NAME_IMPORT_X_TYPESCRIPT]: typescriptConfigIndexes,
  } = evaluateLinterConfigPredicates(
    linterConfigArray,
    {
      [LINTER_CONFIG_NAME_IMPORT_X_CUSTOM]: LINTER_CONFIG_NAME_IMPORT_X_CUSTOM,
      [LINTER_CONFIG_NAME_IMPORT_X_RECOMMENDED]: LINTER_CONFIG_NAME_IMPORT_X_RECOMMENDED,
      [LINTER_CONFIG_NAME_IMPORT_X_SETTINGS]: LINTER_CONFIG_NAME_IMPORT_X_SETTINGS,
      [LINTER_CONFIG_NAME_IMPORT_X_TYPESCRIPT]: LINTER_CONFIG_NAME_IMPORT_X_TYPESCRIPT,
    },
  );

  const settingsConfigExists = settingsConfigIndexes.size > 0;
  const recommendedConfigExists = recommendedConfigIndexes.size > 0;
  const typescriptConfigExists = typescriptConfigIndexes.size > 0;
  const customConfigExists = customConfigIndexes.size > 0;

  if (
    settingsConfigExists
    && recommendedConfigExists
    && typescriptConfigExists
    && customConfigExists
  )
  {
    return;
  }

  const pluginImportX = await suppressErrorMaybeAsync(
    importDefaultExport<typeof ESLintPluginImportX>,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    async (path: string) => await import(path),
    PACKAGE_NAME_ESLINT_PLUGIN_IMPORT_X,
  );

  if (pluginImportX == null)
  {
    return;
  }

  if (!settingsConfigExists)
  {
    const extensions = [
      ".d.ts",
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
      ".cjs",
      ".cjsx",
      ".node",
      ".json",
    ];

    const nodeExtensions = [
      ".js",
      ".mjs",
      ".cjs",
      ".node",
      ".json",
    ];

    const importXResolverNext: (
      | Resolver
      | ReturnType<typeof TypeScriptImportResolverCreatorFunction>
    )[] = [
      pluginImportX.createNodeResolver({
        conditionNames: [
          "import",
          "require",
          "default",
        ],
        extensions: nodeExtensions,
      }),
    ];

    const createTypeScriptImportResolver = await suppressErrorMaybeAsync(
      async () =>
      {
        const {
          createTypeScriptImportResolver,
        } = await import(
          PACKAGE_NAME_ESLINT_IMPORT_RESOLVER_TYPESCRIPT,
        ) as {
          createTypeScriptImportResolver: typeof TypeScriptImportResolverCreatorFunction;
        };

        return createTypeScriptImportResolver;
      },
    );

    if (createTypeScriptImportResolver != null)
    {
      importXResolverNext.push(
        createTypeScriptImportResolver({
          conditionNames: [
            "types",
            "import",
            "require",
            "default",
          ],
          extensions,
        }),
      );
    }

    const internalRegex: (RegExp | string)[] = [];

    if (eslintIntegrationPluginOptions.internalRegex.overrides != null)
    {
      internalRegex.push(...eslintIntegrationPluginOptions.internalRegex.overrides);
    }
    else
    {
      let workspacesUnwrappedRegexp = "";
      let workspacesUnwrappedRegexpOperator = "";

      for (const workspace of eslintContext.workspaces)
      {
        const workspaceNameRegexp = escapeRegExp(workspace.name);

        workspacesUnwrappedRegexp += `${workspacesUnwrappedRegexpOperator}${workspaceNameRegexp}`;
        if (!workspacesUnwrappedRegexpOperator)
        {
          workspacesUnwrappedRegexpOperator = "|";
        }
      }

      if (workspacesUnwrappedRegexp)
      {
        const workspacesRegexp = `^(?:${workspacesUnwrappedRegexp})(?:(?:[\\/]+)(?:.*))?$`;
        internalRegex.push(workspacesRegexp);
      }
    }

    internalRegex.push(...eslintIntegrationPluginOptions.internalRegex.extra);

    let internalRegexSource = "";
    let regexpOperator = "";

    for (const pattern of internalRegex)
    {
      const patternSource = (
        pattern instanceof RegExp
          ? pattern.source
          : pattern
      );

      internalRegexSource += `${regexpOperator}(?:${patternSource})`;

      if (!regexpOperator)
      {
        regexpOperator = "|";
      }
    }

    linterConfigArray.push({
      name: LINTER_CONFIG_NAME_IMPORT_X_SETTINGS,
      settings: {
        // TODO(ertgl): Never set this to `Infinity` if the process started by `eslint_d` or `webpack`. We probably need call-tracing.
        "import-x/cache": (
          process.title === "eslint_d"
            ? undefined
            : Infinity
        ),
        "import-x/extensions": extensions,
        "import-x/internal-regex": internalRegexSource,
        "import-x/parsers": {
          "@typescript-eslint/parser": extensions,
        },
        "import-x/resolver": {
          node: {
            extensions: nodeExtensions,
          },
          typescript: true,
        },
        "import-x/resolver-next": importXResolverNext,
      },
    });
  }

  if (!recommendedConfigExists)
  {
    linterConfigArray.push({
      ...(pluginImportX.flatConfigs.recommended as Linter.Config),
      files: [
        GLOB_PATTERN_CJS_CJSX_CTS_CTSX,
        GLOB_PATTERN_JS_JSX_TS_TSX,
        GLOB_PATTERN_MJS_MJSX_MTS_MTSX,
      ],
      name: LINTER_CONFIG_NAME_IMPORT_X_RECOMMENDED,
    });
  }

  if (!typescriptConfigExists)
  {
    linterConfigArray.push({
      ...(pluginImportX.flatConfigs.typescript as Linter.Config),
      files: [
        GLOB_PATTERN_CTS_MTS_TS,
        GLOB_PATTERN_CTSX_MTSX_TSX,
      ],
      name: LINTER_CONFIG_NAME_IMPORT_X_TYPESCRIPT,
    });
  }

  if (!customConfigExists)
  {
    linterConfigArray.push({
      files: [
        GLOB_PATTERN_CJS_CJSX_CTS_CTSX,
        GLOB_PATTERN_JS_JSX_TS_TSX,
        GLOB_PATTERN_MJS_MJSX_MTS_MTSX,
      ],
      name: LINTER_CONFIG_NAME_IMPORT_X_CUSTOM,
      rules: {
        "import-x/default": "off",
        "import-x/no-named-as-default": "off",
      },
    });
  }
}
