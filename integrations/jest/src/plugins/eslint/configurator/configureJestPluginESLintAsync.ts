import type {
  ESLint,
  Linter,
} from "eslint";
import type ESLintPluginJest from "eslint-plugin-jest";

import { importDefaultExport } from "@holypack/core/lib/module/importDefaultExport";
import { suppressErrorMaybeAsync } from "@holypack/core/lib/runtime/suppressErrorMaybeAsync";
import { evaluateLinterConfigPredicates } from "@holypack/integration-eslint/config/evaluateLinterConfigPredicates";
import type { ESLintContext } from "@holypack/integration-eslint/context/ESLintContext";
import type { ESLintIntegrationResolvedOptions } from "@holypack/integration-eslint/options/ESLintIntegrationResolvedOptions";

import { getJestTestMatch } from "../../../configurator/fields/test-match/getJestTestMatch";
import type { JestIntegrationResolvedOptions } from "../../../options/JestIntegrationResolvedOptions";
import { LINTER_CONFIG_NAME_ISTANBUL_RECOMMENDED } from "../config/names/istanbul-recommended/LINTER_CONFIG_NAME_ISTANBUL_RECOMMENDED";
import { LINTER_CONFIG_NAME_JEST_RECOMMENDED } from "../config/names/jest-recommended/LINTER_CONFIG_NAME_JEST_RECOMMENDED";
import { PACKAGE_NAME_ESLINT_PLUGIN_ISTANBUL } from "../module/PACKAGE_NAME_ESLINT_PLUGIN_ISTANBUL";
import { PACKAGE_NAME_ESLINT_PLUGIN_JEST } from "../module/PACKAGE_NAME_ESLINT_PLUGIN_JEST";
import type { JestIntegrationPluginESLintResolvedOptions } from "../options/JestIntegrationPluginESLintResolvedOptions";

export async function configureJestPluginESLintAsync(
  eslintContext: ESLintContext,
  eslintIntegrationOptions: ESLintIntegrationResolvedOptions,
  jestIntegrationOptions: JestIntegrationResolvedOptions,
  eslintIntegrationPluginOptions: JestIntegrationPluginESLintResolvedOptions,
  linterConfigArray: Linter.Config[],
): Promise<void>
{
  const {
    [LINTER_CONFIG_NAME_ISTANBUL_RECOMMENDED]: istanbulRecommendedConfigIndexes,
    [LINTER_CONFIG_NAME_JEST_RECOMMENDED]: jestRecommendedConfigIndexes,
  } = evaluateLinterConfigPredicates(
    linterConfigArray,
    {
      [LINTER_CONFIG_NAME_ISTANBUL_RECOMMENDED]: LINTER_CONFIG_NAME_ISTANBUL_RECOMMENDED,
      [LINTER_CONFIG_NAME_JEST_RECOMMENDED]: LINTER_CONFIG_NAME_JEST_RECOMMENDED,
    },
  );

  const jestRecommendedConfigExists = jestRecommendedConfigIndexes.size > 0;
  const istanbulRecommendedConfigExists = istanbulRecommendedConfigIndexes.size > 0;

  if (jestRecommendedConfigExists && istanbulRecommendedConfigExists)
  {
    return;
  }

  const testFiles = getJestTestMatch(jestIntegrationOptions);

  if (!jestRecommendedConfigExists)
  {
    const eslintPluginJest = await suppressErrorMaybeAsync(
      importDefaultExport<typeof ESLintPluginJest>,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      async (path: string) => await import(path),
      PACKAGE_NAME_ESLINT_PLUGIN_JEST,
    );

    if (eslintPluginJest != null)
    {
      linterConfigArray.push({
        ...eslintPluginJest.configs["flat/recommended"],
        files: [
          ...testFiles,
        ],
        name: LINTER_CONFIG_NAME_JEST_RECOMMENDED,
      });
    }
  }

  if (!istanbulRecommendedConfigExists)
  {
    const eslintPluginIstanbul = await suppressErrorMaybeAsync(
      importDefaultExport<ESLint.Plugin>,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      async (path: string) => await import(path),
      PACKAGE_NAME_ESLINT_PLUGIN_ISTANBUL,
    );

    if (eslintPluginIstanbul != null)
    {
      linterConfigArray.push({
        files: [
          ...testFiles,
        ],
        name: LINTER_CONFIG_NAME_ISTANBUL_RECOMMENDED,
        plugins: {
          istanbul: eslintPluginIstanbul,
        },
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        rules: (eslintPluginIstanbul.configs!.recommended as { rules: Linter.RulesRecord }).rules,
      });
    }
  }
}
