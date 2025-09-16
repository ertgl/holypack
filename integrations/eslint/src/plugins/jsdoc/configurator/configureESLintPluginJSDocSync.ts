// #[cjs(remove)]
import { createRequire } from "node:module";
// #[cjs(remove)]
import { fileURLToPath } from "node:url";

import type { Linter } from "eslint";
import type ESLintPluginJSDoc from "eslint-plugin-jsdoc";

import { requireDefaultExport } from "@holypack/core/lib/module/requireDefaultExport";
import { suppressErrorSync } from "@holypack/core/lib/runtime/suppressErrorSync";

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
import { LINTER_CONFIG_NAME_JSDOC_CTS_CTSX_MTS_MTSX_TS_TSX } from "../config/names/cts-ctsx-mts-mtsx-ts-tsx/LINTER_CONFIG_NAME_JSDOC_CTS_CTSX_MTS_MTSX_TS_TSX";
import { LINTER_CONFIG_NAME_JSDOC_CUSTOM } from "../config/names/custom/LINTER_CONFIG_NAME_JSDOC_CUSTOM";
import { LINTER_CONFIG_NAME_JSDOC_PLUGIN } from "../config/names/plugin/LINTER_CONFIG_NAME_JSDOC_PLUGIN";
import { LINTER_CONFIG_NAME_JSDOC_RECOMMENDED_JAVASCRIPT } from "../config/names/recommended-javascript/LINTER_CONFIG_NAME_JSDOC_RECOMMENDED_JAVASCRIPT";
import { LINTER_CONFIG_NAME_JSDOC_RECOMMENDED_TYPESCRIPT } from "../config/names/recommended-typescript/LINTER_CONFIG_NAME_JSDOC_RECOMMENDED_TYPESCRIPT";
import { PACKAGE_NAME_ESLINT_PLUGIN_JSDOC } from "../module/PACKAGE_NAME_ESLINT_PLUGIN_JSDOC";
import type { ESLintIntegrationPluginJSDocResolvedOptions } from "../options/ESLintIntegrationPluginJSDocResolvedOptions";

// #[cjs(remove)]
const __filename = fileURLToPath(import.meta.url);

// #[cjs(remove)]
const require = createRequire(__filename);

export function configureESLintPluginJSDocSync(
  eslintContext: ESLintContext,
  eslintIntegrationOptions: ESLintIntegrationResolvedOptions,
  eslintIntegrationPluginOptions: ESLintIntegrationPluginJSDocResolvedOptions,
  linterConfigArray: Linter.Config[],
): void
{
  const {
    [LINTER_CONFIG_NAME_JSDOC_CTS_CTSX_MTS_MTSX_TS_TSX]: ctsCtsxMtsMtsxTsTsxConfigIndexes,
    [LINTER_CONFIG_NAME_JSDOC_CUSTOM]: customConfigIndexes,
    [LINTER_CONFIG_NAME_JSDOC_PLUGIN]: pluginConfigIndexes,
    [LINTER_CONFIG_NAME_JSDOC_RECOMMENDED_JAVASCRIPT]: recommendedJavaScriptConfigIndexes,
    [LINTER_CONFIG_NAME_JSDOC_RECOMMENDED_TYPESCRIPT]: recommendedTypeScriptConfigIndexes,
  } = evaluateLinterConfigPredicates(
    linterConfigArray,
    {
      [LINTER_CONFIG_NAME_JSDOC_CTS_CTSX_MTS_MTSX_TS_TSX]: LINTER_CONFIG_NAME_JSDOC_CTS_CTSX_MTS_MTSX_TS_TSX,
      [LINTER_CONFIG_NAME_JSDOC_CUSTOM]: LINTER_CONFIG_NAME_JSDOC_CUSTOM,
      [LINTER_CONFIG_NAME_JSDOC_PLUGIN]: LINTER_CONFIG_NAME_JSDOC_PLUGIN,
      [LINTER_CONFIG_NAME_JSDOC_RECOMMENDED_JAVASCRIPT]: LINTER_CONFIG_NAME_JSDOC_RECOMMENDED_JAVASCRIPT,
      [LINTER_CONFIG_NAME_JSDOC_RECOMMENDED_TYPESCRIPT]: LINTER_CONFIG_NAME_JSDOC_RECOMMENDED_TYPESCRIPT,
    },
  );

  const pluginConfigExists = pluginConfigIndexes.size > 0;
  const recommendedJavaScriptConfigExists = recommendedJavaScriptConfigIndexes.size > 0;
  const recommendedTypeScriptConfigExists = recommendedTypeScriptConfigIndexes.size > 0;
  const customConfigExists = customConfigIndexes.size > 0;
  const ctsCtsxMtsMtsxTsTsxConfigExists = ctsCtsxMtsMtsxTsTsxConfigIndexes.size > 0;

  if (
    pluginConfigExists
    && recommendedJavaScriptConfigExists
    && recommendedTypeScriptConfigExists
    && customConfigExists
  )
  {
    return;
  }

  const pluginJSDoc = suppressErrorSync(
    requireDefaultExport<typeof ESLintPluginJSDoc>,
    require,
    PACKAGE_NAME_ESLINT_PLUGIN_JSDOC,
  );

  if (pluginJSDoc == null)
  {
    return;
  }

  if (!pluginConfigExists)
  {
    linterConfigArray.push({
      files: [
        GLOB_PATTERN_CJS_CJSX_CTS_CTSX,
        GLOB_PATTERN_JS_JSX_TS_TSX,
        GLOB_PATTERN_MJS_MJSX_MTS_MTSX,
      ],
      name: LINTER_CONFIG_NAME_JSDOC_PLUGIN,
      plugins: {
        jsdoc: pluginJSDoc,
      },
    });
  }

  if (!recommendedJavaScriptConfigExists)
  {
    linterConfigArray.push({
      ...pluginJSDoc.configs["flat/recommended"],
      files: [
        GLOB_PATTERN_CJS_JS_MJS,
        GLOB_PATTERN_CJSX_JSX_MJSX,
      ],
      name: LINTER_CONFIG_NAME_JSDOC_RECOMMENDED_JAVASCRIPT,
    });
  }

  if (!recommendedTypeScriptConfigExists)
  {
    linterConfigArray.push({
      ...pluginJSDoc.configs["flat/recommended-typescript"],
      files: [
        GLOB_PATTERN_CTS_MTS_TS,
        GLOB_PATTERN_CTSX_MTSX_TSX,
      ],
      name: LINTER_CONFIG_NAME_JSDOC_RECOMMENDED_TYPESCRIPT,
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
      name: LINTER_CONFIG_NAME_JSDOC_CUSTOM,
      rules: {
        "jsdoc/check-access": "warn",
        "jsdoc/check-alignment": "warn",
        "jsdoc/check-examples": "off",
        "jsdoc/check-indentation": [
          "warn",
          {
            excludeTags: [
              "example",
              "import",
            ],
          },
        ],
        "jsdoc/check-line-alignment": "warn",
        "jsdoc/check-param-names": "warn",
        "jsdoc/check-property-names": "warn",
        "jsdoc/check-syntax": "warn",
        "jsdoc/check-tag-names": [
          "warn",
          {
            typed: false,
          },
        ],
        "jsdoc/check-template-names": "warn",
        "jsdoc/check-types": "warn",
        "jsdoc/check-values": "warn",
        "jsdoc/empty-tags": "warn",
        "jsdoc/implements-on-classes": "warn",
        "jsdoc/informative-docs": "warn",
        "jsdoc/match-description": "warn",
        "jsdoc/multiline-blocks": "warn",
        "jsdoc/no-bad-blocks": "warn",
        "jsdoc/no-blank-block-descriptions": "warn",
        "jsdoc/no-defaults": "warn",
        "jsdoc/no-missing-syntax": "off",
        "jsdoc/no-multi-asterisks": "warn",
        "jsdoc/no-restricted-syntax": "off",
        "jsdoc/no-types": "off",
        "jsdoc/no-undefined-types": [
          "off",
          {
            mode: "typescript",
          },
        ],
        "jsdoc/require-asterisk-prefix": "warn",
        "jsdoc/require-description": [
          "off",
          {
            descriptionStyle: "tag",
          },
        ],
        "jsdoc/require-description-complete-sentence": "warn",
        "jsdoc/require-example": "off",
        "jsdoc/require-file-overview": "off",
        "jsdoc/require-hyphen-before-param-description": "warn",
        "jsdoc/require-jsdoc": "off",
        "jsdoc/require-param": "off",
        "jsdoc/require-param-description": "off",
        "jsdoc/require-param-name": "warn",
        "jsdoc/require-param-type": "warn",
        "jsdoc/require-property": "off",
        "jsdoc/require-property-description": "off",
        "jsdoc/require-property-name": "warn",
        "jsdoc/require-property-type": "warn",
        "jsdoc/require-returns": "warn",
        "jsdoc/require-returns-check": "warn",
        "jsdoc/require-returns-description": "off",
        "jsdoc/require-returns-type": "warn",
        "jsdoc/require-template": "warn",
        "jsdoc/require-throws": "warn",
        "jsdoc/require-yields": "off",
        "jsdoc/require-yields-check": "warn",
        "jsdoc/sort-tags": "warn",
        "jsdoc/tag-lines": "warn",
        "jsdoc/valid-types": "warn",
      },
    });
  }

  if (!ctsCtsxMtsMtsxTsTsxConfigExists)
  {
    linterConfigArray.push({
      files: [
        GLOB_PATTERN_CTS_MTS_TS,
        GLOB_PATTERN_CTSX_MTSX_TSX,
      ],
      name: LINTER_CONFIG_NAME_JSDOC_CTS_CTSX_MTS_MTSX_TS_TSX,
      rules: {
        "jsdoc/require-param-type": "off",
        "jsdoc/require-returns": "off",
      },
    });
  }
}
