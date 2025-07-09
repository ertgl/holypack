import type { Linter } from "eslint";
import type TypeScriptESLint from "typescript-eslint";

import { importDefaultExport } from "@holypack/core/lib/module/importDefaultExport";
import { suppressErrorMaybeAsync } from "@holypack/core/lib/runtime/suppressErrorMaybeAsync";

import { evaluateLinterConfigPredicates } from "../../../config/evaluateLinterConfigPredicates";
import { GLOB_PATTERN_CJS_CJSX_CTS_CTSX } from "../../../config/glob-patterns/GLOB_PATTERN_CJS_CJSX_CTS_CTSX";
import { GLOB_PATTERN_CJS_JS_MJS } from "../../../config/glob-patterns/GLOB_PATTERN_CJS_JS_MJS";
import { GLOB_PATTERN_CJSX_JSX_MJSX } from "../../../config/glob-patterns/GLOB_PATTERN_CJSX_JSX_MJSX";
import { GLOB_PATTERN_CTS_MTS_TS } from "../../../config/glob-patterns/GLOB_PATTERN_CTS_MTS_TS";
import { GLOB_PATTERN_CTSX_MTSX_TSX } from "../../../config/glob-patterns/GLOB_PATTERN_CTSX_MTSX_TSX";
import { GLOB_PATTERN_JS_JSX_TS_TSX } from "../../../config/glob-patterns/GLOB_PATTERN_JS_JSX_TS_TSX";
import { GLOB_PATTERN_MJS_MJSX_MTS_MTSX } from "../../../config/glob-patterns/GLOB_PATTERN_MJS_MJSX_MTS_MTSX";
import type { ESLintContext } from "../../../context/ESLintContext";
import type { ESLintIntegrationResolvedOptions } from "../../../options/ESLintIntegrationResolvedOptions";
import { LINTER_CONFIG_NAME_TYPESCRIPT_CJS_CJSX_CTS_CTSX } from "../config/names/cjs-cjsx-cts-ctsx/LINTER_CONFIG_NAME_TYPESCRIPT_CJS_CJSX_CTS_CTSX";
import { LINTER_CONFIG_NAME_TYPESCRIPT_CJS_CTS_JS_MJS_MTS_TS } from "../config/names/cjs-cts-js-mjs-mts-ts/LINTER_CONFIG_NAME_TYPESCRIPT_CJS_CTS_JS_MJS_MTS_TS";
import { LINTER_CONFIG_NAME_TYPESCRIPT_CJSX_CTSX_JSX_MJSX_MTSX_TSX } from "../config/names/cjsx-ctsx-jsx-mjsx-mtsx-tsx/LINTER_CONFIG_NAME_TYPESCRIPT_CJSX_CTSX_JSX_MJSX_MTSX_TSX";
import { LINTER_CONFIG_NAME_TYPESCRIPT_CUSTOM } from "../config/names/custom/LINTER_CONFIG_NAME_TYPESCRIPT_CUSTOM";
import { generateLinterConfigNameForTypeScriptStrictTypeChecked } from "../config/names/strict-type-checked/generateLinterConfigNameForTypeScriptStrictTypeChecked";
import { isLinterConfigTypeScriptStrictTypeChecked } from "../config/names/strict-type-checked/isLinterConfigTypeScriptStrictTypeChecked";
import { LINTER_CONFIG_NAME_PREFIX_TYPESCRIPT_STRICT_TYPE_CHECKED } from "../config/names/strict-type-checked/LINTER_CONFIG_NAME_PREFIX_TYPESCRIPT_STRICT_TYPE_CHECKED";
import { PACKAGE_NAME_TYPESCRIPT_ESLINT } from "../module/PACKAGE_NAME_TYPESCRIPT_ESLINT";
import type { ESLintIntegrationPluginTypeScriptResolvedOptions } from "../options/ESLintIntegrationPluginTypeScriptResolvedOptions";

export async function configureESLintPluginTypeScriptAsync(
  eslintContext: ESLintContext,
  eslintIntegrationOptions: ESLintIntegrationResolvedOptions,
  eslintIntegrationPluginOptions: ESLintIntegrationPluginTypeScriptResolvedOptions,
  linterConfigArray: Linter.Config[],
): Promise<void>
{
  const {
    [LINTER_CONFIG_NAME_PREFIX_TYPESCRIPT_STRICT_TYPE_CHECKED]: strictTypeCheckedConfigIndexes,
    [LINTER_CONFIG_NAME_TYPESCRIPT_CJS_CJSX_CTS_CTSX]: cjsCjsxCtsCtsxConfigIndexes,
    [LINTER_CONFIG_NAME_TYPESCRIPT_CJS_CTS_JS_MJS_MTS_TS]: cjsCtsJsMjsMtsTsConfigIndexes,
    [LINTER_CONFIG_NAME_TYPESCRIPT_CJSX_CTSX_JSX_MJSX_MTSX_TSX]: cjsxCtsxJsxMjsxMtsxTsxConfigIndexes,
    [LINTER_CONFIG_NAME_TYPESCRIPT_CUSTOM]: customConfigIndexes,
  } = evaluateLinterConfigPredicates(
    linterConfigArray,
    {
      [LINTER_CONFIG_NAME_PREFIX_TYPESCRIPT_STRICT_TYPE_CHECKED]: isLinterConfigTypeScriptStrictTypeChecked,
      [LINTER_CONFIG_NAME_TYPESCRIPT_CJS_CJSX_CTS_CTSX]: LINTER_CONFIG_NAME_TYPESCRIPT_CJS_CJSX_CTS_CTSX,
      [LINTER_CONFIG_NAME_TYPESCRIPT_CJS_CTS_JS_MJS_MTS_TS]: LINTER_CONFIG_NAME_TYPESCRIPT_CJS_CTS_JS_MJS_MTS_TS,
      [LINTER_CONFIG_NAME_TYPESCRIPT_CJSX_CTSX_JSX_MJSX_MTSX_TSX]: LINTER_CONFIG_NAME_TYPESCRIPT_CJSX_CTSX_JSX_MJSX_MTSX_TSX,
      [LINTER_CONFIG_NAME_TYPESCRIPT_CUSTOM]: LINTER_CONFIG_NAME_TYPESCRIPT_CUSTOM,
    },
  );

  const strictTypeCheckedConfigExists = strictTypeCheckedConfigIndexes.size > 0;
  const customConfigExists = customConfigIndexes.size > 0;
  const cjsCjsxCtsCtsxConfigExists = cjsCjsxCtsCtsxConfigIndexes.size > 0;
  const cjsCtsJsMjsMtsTsConfigExists = cjsCtsJsMjsMtsTsConfigIndexes.size > 0;
  const cjsxCtsxJsxMjsxMtsxTsxConfigExists = cjsxCtsxJsxMjsxMtsxTsxConfigIndexes.size > 0;

  if (
    strictTypeCheckedConfigExists
    && customConfigExists
    && cjsCjsxCtsCtsxConfigExists
    && cjsCtsJsMjsMtsTsConfigExists
    && cjsxCtsxJsxMjsxMtsxTsxConfigExists
  )
  {
    return;
  }

  const typescriptESLint = await suppressErrorMaybeAsync(
    importDefaultExport<typeof TypeScriptESLint>,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    async (path: string) => await import(path),
    PACKAGE_NAME_TYPESCRIPT_ESLINT,
  );

  if (typescriptESLint == null)
  {
    return;
  }

  if (!strictTypeCheckedConfigExists)
  {
    for (
      let configIdx = 0;
      configIdx < typescriptESLint.configs.strictTypeChecked.length;
      configIdx++
    )
    {
      const config = typescriptESLint.configs.strictTypeChecked[configIdx] as Linter.Config;

      const strictTypeCheckedConfigName = generateLinterConfigNameForTypeScriptStrictTypeChecked(
        configIdx,
      );

      linterConfigArray.push({
        ...config,
        files: [
          GLOB_PATTERN_CJS_CJSX_CTS_CTSX,
          GLOB_PATTERN_JS_JSX_TS_TSX,
          GLOB_PATTERN_MJS_MJSX_MTS_MTSX,
        ],
        name: strictTypeCheckedConfigName,
      });
    }
  }

  if (!customConfigExists)
  {
    linterConfigArray.push({
      files: [
        GLOB_PATTERN_CJS_CJSX_CTS_CTSX,
        GLOB_PATTERN_JS_JSX_TS_TSX,
        GLOB_PATTERN_MJS_MJSX_MTS_MTSX,
      ],
      name: LINTER_CONFIG_NAME_TYPESCRIPT_CUSTOM,
      rules: {
        "@typescript-eslint/ban-ts-comment": "warn",
        "@typescript-eslint/consistent-type-exports": [
          "error",
          {
            fixMixedExportsWithInlineTypeSpecifier: false,
          },
        ],
        "@typescript-eslint/no-empty-object-type": "warn",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unnecessary-type-parameters": "off",
        "@typescript-eslint/no-unused-vars": [
          "warn",
          {
            args: "none",
            varsIgnorePattern: "^_",
          },
        ],
        "@typescript-eslint/unified-signatures": "off",
      },
    });
  }

  if (!cjsCjsxCtsCtsxConfigExists)
  {
    linterConfigArray.push({
      files: [
        GLOB_PATTERN_CJS_CJSX_CTS_CTSX,
      ],
      name: LINTER_CONFIG_NAME_TYPESCRIPT_CJS_CJSX_CTS_CTSX,
      rules: {
        "@typescript-eslint/no-require-imports": "off",
      },
    });
  }

  const baseLanguageOptions = {
    parserOptions: {
      projectService: true,
      tsconfigRootDir: eslintContext.cwd,
      warnOnUnsupportedTypeScriptVersion: eslintIntegrationPluginOptions.warnOnUnsupportedTypeScriptVersion,
    },
  } satisfies Linter.Config["languageOptions"];

  if (!cjsCtsJsMjsMtsTsConfigExists)
  {
    linterConfigArray.push({
      files: [
        GLOB_PATTERN_CJS_JS_MJS,
        GLOB_PATTERN_CTS_MTS_TS,
      ],
      languageOptions: {
        ...baseLanguageOptions,
        parserOptions: {
          ...baseLanguageOptions.parserOptions,
        },
      },
      name: LINTER_CONFIG_NAME_TYPESCRIPT_CJS_CTS_JS_MJS_MTS_TS,
    });
  }

  if (!cjsxCtsxJsxMjsxMtsxTsxConfigExists)
  {
    linterConfigArray.push({
      files: [
        GLOB_PATTERN_CJSX_JSX_MJSX,
        GLOB_PATTERN_CTSX_MTSX_TSX,
      ],
      languageOptions: {
        ...baseLanguageOptions,
        parserOptions: {
          ...baseLanguageOptions.parserOptions,
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      name: LINTER_CONFIG_NAME_TYPESCRIPT_CJSX_CTSX_JSX_MJSX_MTSX_TSX,
    });
  }
}
