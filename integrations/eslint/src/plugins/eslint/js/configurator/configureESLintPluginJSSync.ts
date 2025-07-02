// #[cjs(remove)]
import { createRequire } from "node:module";
// #[cjs(remove)]
import { fileURLToPath } from "node:url";

import type ESLintJS from "@eslint/js";
import type { Linter } from "eslint";

import { requireDefaultExport } from "@holypack/core/lib/module/requireDefaultExport";
import { suppressErrorSync } from "@holypack/core/lib/runtime/suppressErrorSync";

import { evaluateLinterConfigPredicates } from "../../../../config/evaluateLinterConfigPredicates";
import { GLOB_PATTERN_CJS_JS_MJS } from "../../../../config/glob-patterns/GLOB_PATTERN_CJS_JS_MJS";
import { GLOB_PATTERN_CJSX_JSX_MJSX } from "../../../../config/glob-patterns/GLOB_PATTERN_CJSX_JSX_MJSX";
import type { ESLintContext } from "../../../../context/ESLintContext";
import type { ESLintIntegrationResolvedOptions } from "../../../../options/ESLintIntegrationResolvedOptions";
import { LINTER_CONFIG_NAME_ESLINT_JS_CUSTOM } from "../config/names/custom/LINTER_CONFIG_NAME_ESLINT_JS_CUSTOM";
import { LINTER_CONFIG_NAME_ESLINT_JS_RECOMMENDED } from "../config/names/recommended/LINTER_CONFIG_NAME_ESLINT_JS_RECOMMENDED";
import { PACKAGE_NAME_ESLINT_JS } from "../module/PACKAGE_NAME_ESLINT_JS";
import type { ESLintIntegrationPluginJSResolvedOptions } from "../options/ESLintIntegrationPluginJSResolvedOptions";

// #[cjs(remove)]
const __filename = fileURLToPath(import.meta.url);

// #[cjs(remove)]
const require = createRequire(__filename);

export function configureESLintPluginJSSync(
  eslintContext: ESLintContext,
  eslintIntegrationOptions: ESLintIntegrationResolvedOptions,
  eslintIntegrationPluginOptions: ESLintIntegrationPluginJSResolvedOptions,
  linterConfigArray: Linter.Config[],
): void
{
  const {
    [LINTER_CONFIG_NAME_ESLINT_JS_CUSTOM]: customConfigIndexes,
    [LINTER_CONFIG_NAME_ESLINT_JS_RECOMMENDED]: recommendedConfigIndexes,
  } = evaluateLinterConfigPredicates(
    linterConfigArray,
    {
      [LINTER_CONFIG_NAME_ESLINT_JS_CUSTOM]: LINTER_CONFIG_NAME_ESLINT_JS_CUSTOM,
      [LINTER_CONFIG_NAME_ESLINT_JS_RECOMMENDED]: LINTER_CONFIG_NAME_ESLINT_JS_RECOMMENDED,
    },
  );

  const recommendedConfigExists = recommendedConfigIndexes.size > 0;
  const customConfigExists = customConfigIndexes.size > 0;

  if (recommendedConfigExists && customConfigExists)
  {
    return;
  }

  const eslintJS = suppressErrorSync(
    requireDefaultExport<typeof ESLintJS>,
    require,
    PACKAGE_NAME_ESLINT_JS,
  );

  if (eslintJS == null)
  {
    return;
  }

  if (!recommendedConfigExists)
  {
    linterConfigArray.push({
      ...eslintJS.configs.recommended,
      files: [
        GLOB_PATTERN_CJS_JS_MJS,
        GLOB_PATTERN_CJSX_JSX_MJSX,
      ],
      name: LINTER_CONFIG_NAME_ESLINT_JS_RECOMMENDED,
    });
  }

  if (!customConfigExists)
  {
    linterConfigArray.push({
      files: [
        GLOB_PATTERN_CJS_JS_MJS,
        GLOB_PATTERN_CJSX_JSX_MJSX,
      ],
      name: LINTER_CONFIG_NAME_ESLINT_JS_CUSTOM,
      rules: {
        "no-unused-vars": [
          "warn",
          {
            args: "none",
          },
        ],
      },
    });
  }
}
