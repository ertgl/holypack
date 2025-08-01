import type { Linter } from "eslint";
import type ESLintPluginYML from "eslint-plugin-yml";

import { importDefaultExport } from "@holypack/core/lib/module/importDefaultExport";
import { suppressErrorMaybeAsync } from "@holypack/core/lib/runtime/suppressErrorMaybeAsync";

import { evaluateLinterConfigPredicates } from "../../../config/evaluateLinterConfigPredicates";
import { GLOB_PATTERN_YAML_YML } from "../../../config/glob-patterns/GLOB_PATTERN_YAML_YML";
import type { ESLintContext } from "../../../context/ESLintContext";
import type { ESLintIntegrationResolvedOptions } from "../../../options/ESLintIntegrationResolvedOptions";
import { LINTER_CONFIG_NAME_YML_CUSTOM } from "../config/names/custom/LINTER_CONFIG_NAME_YML_CUSTOM";
import { generateLinterConfigNameForYMLRecommended } from "../config/names/recommended/generateLinterConfigNameForYMLRecommended";
import { isLinterConfigYMLRecommended } from "../config/names/recommended/isLinterConfigYMLRecommended";
import { LINTER_CONFIG_NAME_PREFIX_YML_RECOMMENDED } from "../config/names/recommended/LINTER_CONFIG_NAME_PREFIX_YML_RECOMMENDED";
import { PACKAGE_NAME_ESLINT_PLUGIN_YML } from "../module/PACKAGE_NAME_ESLINT_PLUGIN_YML";
import type { ESLintIntegrationPluginYMLResolvedOptions } from "../options/ESLintIntegrationPluginYMLResolvedOptions";

export async function configureESLintPluginYMLAsync(
  eslintContext: ESLintContext,
  eslintIntegrationOptions: ESLintIntegrationResolvedOptions,
  eslintIntegrationPluginOptions: ESLintIntegrationPluginYMLResolvedOptions,
  linterConfigArray: Linter.Config[],
): Promise<void>
{
  const {
    [LINTER_CONFIG_NAME_PREFIX_YML_RECOMMENDED]: recommendedConfigIndexes,
    [LINTER_CONFIG_NAME_YML_CUSTOM]: customConfigIndexes,
  } = evaluateLinterConfigPredicates(
    linterConfigArray,
    {
      [LINTER_CONFIG_NAME_PREFIX_YML_RECOMMENDED]: isLinterConfigYMLRecommended,
      [LINTER_CONFIG_NAME_YML_CUSTOM]: LINTER_CONFIG_NAME_YML_CUSTOM,
    },
  );

  const recommendedConfigExists = recommendedConfigIndexes.size > 0;
  const customConfigExists = customConfigIndexes.size > 0;

  if (
    recommendedConfigExists
    && customConfigExists
  )
  {
    return;
  }

  const pluginYML = await suppressErrorMaybeAsync(
    importDefaultExport<typeof ESLintPluginYML>,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    async (path: string) => await import(path),
    PACKAGE_NAME_ESLINT_PLUGIN_YML,
  );

  if (pluginYML == null)
  {
    return;
  }

  if (!recommendedConfigExists)
  {
    for (
      let configIdx = 0;
      configIdx < pluginYML.configs["flat/recommended"].length;
      configIdx++
    )
    {
      const config = pluginYML.configs["flat/recommended"][configIdx];

      const configName = generateLinterConfigNameForYMLRecommended(configIdx);

      linterConfigArray.push({
        ...config,
        files: [
          GLOB_PATTERN_YAML_YML,
        ],
        name: configName,
      });
    }
  }

  if (!customConfigExists)
  {
    linterConfigArray.push({
      files: [
        GLOB_PATTERN_YAML_YML,
      ],
      name: LINTER_CONFIG_NAME_YML_CUSTOM,
      rules: {
        "yml/no-empty-mapping-value": "off",
      },
    });
  }
}
