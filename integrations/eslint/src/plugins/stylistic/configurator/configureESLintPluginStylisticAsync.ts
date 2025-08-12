import type StylisticESLintPlugin from "@stylistic/eslint-plugin";
import type { Linter } from "eslint";

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
import { LINTER_CONFIG_NAME_STYLISTIC_CUSTOM } from "../config/names/custom/LINTER_CONFIG_NAME_STYLISTIC_CUSTOM";
import { LINTER_CONFIG_NAME_STYLISTIC_CUSTOMIZED_CJS_CTS_JS_MJS_MTS_TS } from "../config/names/customized-cjs-cts-js-mjs-mts-ts/LINTER_CONFIG_NAME_STYLISTIC_CUSTOMIZED_CJS_CTS_JS_MJS_MTS_TS";
import { LINTER_CONFIG_NAME_STYLISTIC_CUSTOMIZED_CJSX_CTSX_JSX_MJSX_MTSX_TSX } from "../config/names/customized-cjsx-ctsx-jsx-mjsx-mtsx-tsx/LINTER_CONFIG_NAME_STYLISTIC_CUSTOMIZED_CJSX_CTSX_JSX_MJSX_MTSX_TSX";
import { LINTER_CONFIG_NAME_STYLISTIC_RECOMMENDED } from "../config/names/recommended/LINTER_CONFIG_NAME_STYLISTIC_RECOMMENDED";
import { PACKAGE_NAME_STYLISTIC_ESLINT_PLUGIN } from "../module/PACKAGE_NAME_STYLISTIC_ESLINT_PLUGIN";
import type { ESLintIntegrationPluginStylisticResolvedOptions } from "../options/ESLintIntegrationPluginStylisticResolvedOptions";

export async function configureESLintPluginStylisticAsync(
  eslintContext: ESLintContext,
  eslintIntegrationOptions: ESLintIntegrationResolvedOptions,
  eslintIntegrationPluginOptions: ESLintIntegrationPluginStylisticResolvedOptions,
  linterConfigArray: Linter.Config[],
): Promise<void>
{
  const {
    [LINTER_CONFIG_NAME_STYLISTIC_CUSTOM]: customConfigIndexes,
    [LINTER_CONFIG_NAME_STYLISTIC_CUSTOMIZED_CJS_CTS_JS_MJS_MTS_TS]: customizedCjsCtsJsMjsMtsTsConfigIndexes,
    [LINTER_CONFIG_NAME_STYLISTIC_CUSTOMIZED_CJSX_CTSX_JSX_MJSX_MTSX_TSX]: customizedCjsxCtsxJsxMjsxMtsxTsxConfigIndexes,
    [LINTER_CONFIG_NAME_STYLISTIC_RECOMMENDED]: recommendedConfigIndexes,
  } = evaluateLinterConfigPredicates(
    linterConfigArray,
    {
      [LINTER_CONFIG_NAME_STYLISTIC_CUSTOM]: LINTER_CONFIG_NAME_STYLISTIC_CUSTOM,
      [LINTER_CONFIG_NAME_STYLISTIC_CUSTOMIZED_CJS_CTS_JS_MJS_MTS_TS]: LINTER_CONFIG_NAME_STYLISTIC_CUSTOMIZED_CJS_CTS_JS_MJS_MTS_TS,
      [LINTER_CONFIG_NAME_STYLISTIC_CUSTOMIZED_CJSX_CTSX_JSX_MJSX_MTSX_TSX]: LINTER_CONFIG_NAME_STYLISTIC_CUSTOMIZED_CJSX_CTSX_JSX_MJSX_MTSX_TSX,
      [LINTER_CONFIG_NAME_STYLISTIC_RECOMMENDED]: LINTER_CONFIG_NAME_STYLISTIC_RECOMMENDED,
    },
  );

  const recommendedConfigExists = recommendedConfigIndexes.size > 0;
  const customizedCjsCtsJsMjsMtsTsConfigExists = customizedCjsCtsJsMjsMtsTsConfigIndexes.size > 0;
  const customizedCjsxCtsxJsxMjsxMtsxTsxConfigExists = customizedCjsxCtsxJsxMjsxMtsxTsxConfigIndexes.size > 0;
  const customConfigExists = customConfigIndexes.size > 0;

  if (
    recommendedConfigExists
    && customizedCjsCtsJsMjsMtsTsConfigExists
    && customizedCjsxCtsxJsxMjsxMtsxTsxConfigExists
    && customConfigExists
  )
  {
    return;
  }

  const stylisticPlugin = await suppressErrorMaybeAsync(
    importDefaultExport<typeof StylisticESLintPlugin>,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    async (path: string) => await import(path),
    PACKAGE_NAME_STYLISTIC_ESLINT_PLUGIN,
  );

  if (stylisticPlugin == null)
  {
    return;
  }

  if (!recommendedConfigExists)
  {
    linterConfigArray.push({
      ...stylisticPlugin.configs.recommended,
      files: [
        GLOB_PATTERN_CJS_CJSX_CTS_CTSX,
        GLOB_PATTERN_MJS_MJSX_MTS_MTSX,
        GLOB_PATTERN_JS_JSX_TS_TSX,
      ],
      name: LINTER_CONFIG_NAME_STYLISTIC_RECOMMENDED,
    });
  }

  const arrowParens = (
    eslintIntegrationPluginOptions.overrides.arrowParens
    ?? true
  );

  const braceStyle = (
    eslintIntegrationPluginOptions.overrides.braceStyle
    ?? "allman"
  );

  const commaDangle = (
    eslintIntegrationPluginOptions.overrides.commaDangle
    ?? "always-multiline"
  );

  const indent = (
    eslintIntegrationPluginOptions.overrides.indent
    ?? 2
  );

  const quotes = (
    eslintIntegrationPluginOptions.overrides.quotes
    ?? "double"
  );

  const semi = (
    eslintIntegrationPluginOptions.overrides.semi
    ?? true
  );

  if (!customizedCjsCtsJsMjsMtsTsConfigExists)
  {
    linterConfigArray.push({
      ...stylisticPlugin.configs.customize({
        ...eslintIntegrationPluginOptions.overrides,
        arrowParens,
        braceStyle,
        commaDangle,
        indent,
        jsx: false,
        quotes,
        semi,
      }),
      files: [
        GLOB_PATTERN_CJS_JS_MJS,
        GLOB_PATTERN_CTS_MTS_TS,
      ],
      name: LINTER_CONFIG_NAME_STYLISTIC_CUSTOMIZED_CJS_CTS_JS_MJS_MTS_TS,
    });
  }

  if (!customizedCjsxCtsxJsxMjsxMtsxTsxConfigExists)
  {
    linterConfigArray.push({
      ...stylisticPlugin.configs.customize({
        ...eslintIntegrationPluginOptions.overrides,
        arrowParens,
        braceStyle,
        commaDangle,
        indent,
        jsx: true,
        quotes,
        semi,
      }),
      files: [
        GLOB_PATTERN_CJSX_JSX_MJSX,
        GLOB_PATTERN_CTSX_MTSX_TSX,
      ],
      name: LINTER_CONFIG_NAME_STYLISTIC_CUSTOMIZED_CJSX_CTSX_JSX_MJSX_MTSX_TSX,
    });
  }

  if (!customConfigExists)
  {
    linterConfigArray.push({
      files: [
        GLOB_PATTERN_CJS_CJSX_CTS_CTSX,
        GLOB_PATTERN_MJS_MJSX_MTS_MTSX,
        GLOB_PATTERN_JS_JSX_TS_TSX,
      ],
      name: LINTER_CONFIG_NAME_STYLISTIC_CUSTOM,
      rules: {
        "@stylistic/array-bracket-newline": [
          "error",
          "consistent",
        ],
        "@stylistic/array-element-newline": [
          "error",
          {
            ArrayExpression: "consistent",
            ArrayPattern: {
              minItems: null,
              multiline: true,
            },
          },
        ],
        "@stylistic/object-curly-newline": [
          "error",
          {
            consistent: true,
            minProperties: 2,
            multiline: true,
          },
        ],
        "@stylistic/object-property-newline": [
          "error",
          {
            allowAllPropertiesOnSameLine: false,
          },
        ],
        "@stylistic/quotes": [
          "error",
          quotes,
          {
            allowTemplateLiterals: "always",
            avoidEscape: false,
            ignoreStringLiterals: false,
          },
        ],
      },
    });
  }
}
