import type { Linter } from "eslint";
import { globalIgnores } from "eslint/config";

import { evaluateLinterConfigPredicates } from "../../../../config/evaluateLinterConfigPredicates";
import type { ESLintContext } from "../../../../context/ESLintContext";
import type { ESLintIntegrationResolvedOptions } from "../../../../options/ESLintIntegrationResolvedOptions";
import { getDefaultGlobalIgnorePatterns } from "../config/glob-patterns/getDefaultGlobalIgnorePatterns";
import { LINTER_CONFIG_NAME_ESLINT_GLOBAL_IGNORES_CUSTOM } from "../config/names/custom/LINTER_CONFIG_NAME_ESLINT_GLOBAL_IGNORES_CUSTOM";
import { LINTER_CONFIG_NAME_ESLINT_GLOBAL_IGNORES_EXTRA } from "../config/names/extra/LINTER_CONFIG_NAME_ESLINT_GLOBAL_IGNORES_EXTRA";
import type { ESLintIntegrationPluginGlobalIgnoresResolvedOptions } from "../options/ESLintIntegrationPluginGlobalIgnoresResolvedOptions";

export function configureESLintPluginGlobalIgnoresSync(
  eslintContext: ESLintContext,
  eslintIntegrationOptions: ESLintIntegrationResolvedOptions,
  eslintIntegrationPluginOptions: ESLintIntegrationPluginGlobalIgnoresResolvedOptions,
  linterConfigArray: Linter.Config[],
): void
{
  const {
    [LINTER_CONFIG_NAME_ESLINT_GLOBAL_IGNORES_CUSTOM]: customConfigIndexes,
    [LINTER_CONFIG_NAME_ESLINT_GLOBAL_IGNORES_EXTRA]: extraConfigIndexes,
  } = evaluateLinterConfigPredicates(
    linterConfigArray,
    {
      [LINTER_CONFIG_NAME_ESLINT_GLOBAL_IGNORES_CUSTOM]: LINTER_CONFIG_NAME_ESLINT_GLOBAL_IGNORES_CUSTOM,
      [LINTER_CONFIG_NAME_ESLINT_GLOBAL_IGNORES_EXTRA]: LINTER_CONFIG_NAME_ESLINT_GLOBAL_IGNORES_EXTRA,
    },
  );

  const customConfigExists = customConfigIndexes.size > 0;
  const extraConfigExists = extraConfigIndexes.size > 0;

  if (!customConfigExists)
  {
    const ignorePatterns = (
      eslintIntegrationPluginOptions.overrides
      ?? getDefaultGlobalIgnorePatterns()
    );

    if (ignorePatterns.length > 0)
    {
      linterConfigArray.push(
        globalIgnores(
          ignorePatterns,
          LINTER_CONFIG_NAME_ESLINT_GLOBAL_IGNORES_CUSTOM,
        ),
      );
    }
  }

  if (!extraConfigExists)
  {
    if (eslintIntegrationPluginOptions.extra.length > 0)
    {
      linterConfigArray.push(
        globalIgnores(
          eslintIntegrationPluginOptions.extra,
          LINTER_CONFIG_NAME_ESLINT_GLOBAL_IGNORES_EXTRA,
        ),
      );
    }
  }
}
