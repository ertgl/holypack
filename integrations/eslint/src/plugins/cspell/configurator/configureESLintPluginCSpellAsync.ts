import type CSpellConfig from "@cspell/eslint-plugin/recommended";
import type { Linter } from "eslint";

import { importDefaultExport } from "@holypack/core/lib/module/importDefaultExport";
import { resolvePath } from "@holypack/core/lib/path/resolvePath";
import { suppressErrorMaybeAsync } from "@holypack/core/lib/runtime/suppressErrorMaybeAsync";

import { evaluateLinterConfigPredicates } from "../../../config/evaluateLinterConfigPredicates";
import { GLOB_PATTERN_ANY } from "../../../config/glob-patterns/GLOB_PATTERN_ANY";
import type { ESLintContext } from "../../../context/ESLintContext";
import type { ESLintIntegrationResolvedOptions } from "../../../options/ESLintIntegrationResolvedOptions";
import { LINTER_CONFIG_NAME_CSPELL_CUSTOM } from "../config/LINTER_CONFIG_NAME_CSPELL_CUSTOM";
import { LINTER_CONFIG_NAME_CSPELL_RECOMMENDED } from "../config/LINTER_CONFIG_NAME_CSPELL_RECOMMENDED";
import { PACKAGE_NAME_CSPELL_ESLINT_PLUGIN } from "../module/PACKAGE_NAME_CSPELL_ESLINT_PLUGIN";
import type { ESLintIntegrationPluginCSpellResolvedOptions } from "../options/ESLintIntegrationPluginCSpellResolvedOptions";

export async function configureESLintPluginCSpellAsync(
  eslintContext: ESLintContext,
  eslintIntegrationOptions: ESLintIntegrationResolvedOptions,
  eslintIntegrationPluginOptions: ESLintIntegrationPluginCSpellResolvedOptions,
  linterConfigArray: Linter.Config[],
): Promise<void>
{
  const {
    [LINTER_CONFIG_NAME_CSPELL_CUSTOM]: customConfigIndexes,
    [LINTER_CONFIG_NAME_CSPELL_RECOMMENDED]: recommendedConfigIndexes,
  } = evaluateLinterConfigPredicates(
    linterConfigArray,
    {
      [LINTER_CONFIG_NAME_CSPELL_CUSTOM]: LINTER_CONFIG_NAME_CSPELL_CUSTOM,
      [LINTER_CONFIG_NAME_CSPELL_RECOMMENDED]: LINTER_CONFIG_NAME_CSPELL_RECOMMENDED,
    },
  );

  const recommendedConfigExists = recommendedConfigIndexes.size > 0;
  const customConfigExists = customConfigIndexes.size > 0;

  if (recommendedConfigExists && customConfigExists)
  {
    return;
  }

  const recommendedConfig = await suppressErrorMaybeAsync(
    importDefaultExport<typeof CSpellConfig>,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    async (path: string) => await import(path),
    PACKAGE_NAME_CSPELL_ESLINT_PLUGIN,
  );

  if (recommendedConfig == null)
  {
    return;
  }

  if (!recommendedConfigExists)
  {
    linterConfigArray.push({
      ...recommendedConfig,
      files: [
        GLOB_PATTERN_ANY,
      ],
      name: LINTER_CONFIG_NAME_CSPELL_RECOMMENDED,
    });
  }

  if (!customConfigExists)
  {
    linterConfigArray.push({
      files: [
        GLOB_PATTERN_ANY,
      ],
      name: LINTER_CONFIG_NAME_CSPELL_CUSTOM,
      rules: {
        "@cspell/spellchecker": [
          "warn",
          {
            autoFix: eslintIntegrationPluginOptions.overrides.autoFix ?? false,
            checkComments: eslintIntegrationPluginOptions.overrides.checkComments ?? true,
            checkIdentifiers: eslintIntegrationPluginOptions.overrides.checkIdentifiers ?? true,
            checkJSXText: eslintIntegrationPluginOptions.overrides.checkJSXText ?? true,
            checkStrings: eslintIntegrationPluginOptions.overrides.checkStrings ?? true,
            checkStringTemplates: eslintIntegrationPluginOptions.overrides.checkStringTemplates ?? true,
            configFile: (
              eslintIntegrationPluginOptions.overrides.configFile
              ?? resolvePath(
                eslintContext.project.path,
                "cspell.config.yaml",
              )
            ),
            cspellOptionsRoot: eslintContext.project.path,
            generateSuggestions: eslintIntegrationPluginOptions.overrides.generateSuggestions ?? true,
            ignoreImportProperties: eslintIntegrationPluginOptions.overrides.ignoreImportProperties ?? false,
            ignoreImports: eslintIntegrationPluginOptions.overrides.ignoreImports ?? false,
            numSuggestions: eslintIntegrationPluginOptions.overrides.numSuggestions ?? 1,
          },
        ],
      },
    });
  }
}
