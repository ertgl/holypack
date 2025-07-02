// #[cjs(remove)]
import { createRequire } from "node:module";
// #[cjs(remove)]
import { fileURLToPath } from "node:url";

import type ESLintJSON from "@eslint/json";
import type { Linter } from "eslint";

import { requireDefaultExport } from "@holypack/core/lib/module/requireDefaultExport";
import { suppressErrorSync } from "@holypack/core/lib/runtime/suppressErrorSync";

import { evaluateLinterConfigPredicates } from "../../../../config/evaluateLinterConfigPredicates";
import { GLOB_PATTERN_JSON } from "../../../../config/glob-patterns/GLOB_PATTERN_JSON";
import { GLOB_PATTERN_JSON5 } from "../../../../config/glob-patterns/GLOB_PATTERN_JSON5";
import { GLOB_PATTERN_JSONC } from "../../../../config/glob-patterns/GLOB_PATTERN_JSONC";
import type { ESLintContext } from "../../../../context/ESLintContext";
import type { ESLintIntegrationResolvedOptions } from "../../../../options/ESLintIntegrationResolvedOptions";
import { LINTER_CONFIG_NAME_ESLINT_JSON_JSON } from "../config/names/json/LINTER_CONFIG_NAME_ESLINT_JSON_JSON";
import { LINTER_CONFIG_NAME_ESLINT_JSON_JSON5 } from "../config/names/json5/LINTER_CONFIG_NAME_ESLINT_JSON_JSON5";
import { LINTER_CONFIG_NAME_ESLINT_JSON_JSONC } from "../config/names/jsonc/LINTER_CONFIG_NAME_ESLINT_JSON_JSONC";
import { LINTER_CONFIG_NAME_ESLINT_JSON_RECOMMENDED } from "../config/names/recommended/LINTER_CONFIG_NAME_ESLINT_JSON_RECOMMENDED";
import { PACKAGE_NAME_ESLINT_JSON } from "../module/PACKAGE_NAME_ESLINT_JSON";
import type { ESLintIntegrationPluginJSONResolvedOptions } from "../options/ESLintIntegrationPluginJSONResolvedOptions";

// #[cjs(remove)]
const __filename = fileURLToPath(import.meta.url);

// #[cjs(remove)]
const require = createRequire(__filename);

export function configureESLintPluginJSONSync(
  eslintContext: ESLintContext,
  eslintIntegrationOptions: ESLintIntegrationResolvedOptions,
  pluginJSONOptions: ESLintIntegrationPluginJSONResolvedOptions,
  linterConfigArray: Linter.Config[],
): void
{
  const {
    [LINTER_CONFIG_NAME_ESLINT_JSON_JSON]: jsonConfigIndexes,
    [LINTER_CONFIG_NAME_ESLINT_JSON_JSON5]: json5ConfigIndexes,
    [LINTER_CONFIG_NAME_ESLINT_JSON_JSONC]: jsoncConfigIndexes,
    [LINTER_CONFIG_NAME_ESLINT_JSON_RECOMMENDED]: recommendedConfigIndexes,
  } = evaluateLinterConfigPredicates(
    linterConfigArray,
    {
      [LINTER_CONFIG_NAME_ESLINT_JSON_JSON]: LINTER_CONFIG_NAME_ESLINT_JSON_JSON,
      [LINTER_CONFIG_NAME_ESLINT_JSON_JSON5]: LINTER_CONFIG_NAME_ESLINT_JSON_JSON5,
      [LINTER_CONFIG_NAME_ESLINT_JSON_JSONC]: LINTER_CONFIG_NAME_ESLINT_JSON_JSONC,
      [LINTER_CONFIG_NAME_ESLINT_JSON_RECOMMENDED]: LINTER_CONFIG_NAME_ESLINT_JSON_RECOMMENDED,
    },
  );

  const recommendedConfigExists = recommendedConfigIndexes.size > 0;
  const jsonConfigExists = jsonConfigIndexes.size > 0;
  const json5ConfigExists = json5ConfigIndexes.size > 0;
  const jsoncConfigExists = jsoncConfigIndexes.size > 0;

  if (
    recommendedConfigExists
    && jsonConfigExists
    && json5ConfigExists
    && jsoncConfigExists
  )
  {
    return;
  }

  const eslintJSON = suppressErrorSync(
    requireDefaultExport<typeof ESLintJSON>,
    require,
    PACKAGE_NAME_ESLINT_JSON,
  );

  if (eslintJSON == null)
  {
    return;
  }

  if (!recommendedConfigExists)
  {
    linterConfigArray.push({
      ...eslintJSON.configs.recommended,
      files: [
        GLOB_PATTERN_JSON,
        GLOB_PATTERN_JSON5,
        GLOB_PATTERN_JSONC,
      ],
      name: LINTER_CONFIG_NAME_ESLINT_JSON_RECOMMENDED,
    });
  }

  if (!jsonConfigExists)
  {
    linterConfigArray.push({
      files: [
        GLOB_PATTERN_JSON,
      ],
      language: "json/json",
      name: LINTER_CONFIG_NAME_ESLINT_JSON_JSON,
    });
  }

  if (!json5ConfigExists)
  {
    linterConfigArray.push({
      files: [
        GLOB_PATTERN_JSON5,
      ],
      language: "json/json5",
      name: LINTER_CONFIG_NAME_ESLINT_JSON_JSON5,
    });
  }

  if (!jsoncConfigExists)
  {
    linterConfigArray.push({
      files: [
        GLOB_PATTERN_JSONC,
      ],
      language: "json/jsonc",
      name: LINTER_CONFIG_NAME_ESLINT_JSON_JSONC,
    });
  }
}
