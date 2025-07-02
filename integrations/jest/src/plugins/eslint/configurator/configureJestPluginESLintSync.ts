// #[cjs(remove)]
import { createRequire } from "node:module";
// #[cjs(remove)]
import { fileURLToPath } from "node:url";

import type {
  ESLint,
  Linter,
} from "eslint";
import type ESLintPluginJest from "eslint-plugin-jest";

import { requireDefaultExport } from "@holypack/core/lib/module/requireDefaultExport";
import { suppressErrorSync } from "@holypack/core/lib/runtime/suppressErrorSync";
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

// #[cjs(remove)]
const __filename = fileURLToPath(import.meta.url);

// #[cjs(remove)]
const require = createRequire(__filename);

export function configureJestPluginESLintSync(
  eslintContext: ESLintContext,
  eslintIntegrationOptions: ESLintIntegrationResolvedOptions,
  jestIntegrationOptions: JestIntegrationResolvedOptions,
  eslintIntegrationPluginOptions: JestIntegrationPluginESLintResolvedOptions,
  linterConfigArray: Linter.Config[],
): void
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
    const eslintPluginJest = suppressErrorSync(
      requireDefaultExport<typeof ESLintPluginJest>,
      require,
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
    const eslintPluginIstanbul = suppressErrorSync(
      requireDefaultExport<ESLint.Plugin>,
      require,
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
