import type { Linter } from "eslint";
import type ESLintPluginPerfectionist from "eslint-plugin-perfectionist";
import escapeRegExp from "lodash.escaperegexp";

import { importDefaultExport } from "@holypack/core/lib/module/importDefaultExport";
import { getRegExpSource } from "@holypack/core/lib/regexp/getRegExpSource";
import { suppressErrorMaybeAsync } from "@holypack/core/lib/runtime/suppressErrorMaybeAsync";

import { evaluateLinterConfigPredicates } from "../../../config/evaluateLinterConfigPredicates";
import { GLOB_PATTERN_CJS_CJSX_CTS_CTSX } from "../../../config/glob-patterns/GLOB_PATTERN_CJS_CJSX_CTS_CTSX";
import { GLOB_PATTERN_JS_JSX_TS_TSX } from "../../../config/glob-patterns/GLOB_PATTERN_JS_JSX_TS_TSX";
import { GLOB_PATTERN_MJS_MJSX_MTS_MTSX } from "../../../config/glob-patterns/GLOB_PATTERN_MJS_MJSX_MTS_MTSX";
import type { ESLintContext } from "../../../context/ESLintContext";
import type { ESLintIntegrationResolvedOptions } from "../../../options/ESLintIntegrationResolvedOptions";
import { LINTER_CONFIG_NAME_PERFECTIONIST_CUSTOM } from "../config/names/custom/LINTER_CONFIG_NAME_PERFECTIONIST_CUSTOM";
import { LINTER_CONFIG_NAME_PERFECTIONIST_RECOMMENDED_NATURAL } from "../config/names/recommended-natural/LINTER_CONFIG_NAME_PERFECTIONIST_RECOMMENDED_NATURAL";
import { PACKAGE_NAME_ESLINT_PLUGIN_PERFECTIONIST } from "../module/PACKAGE_NAME_ESLINT_PLUGIN_PERFECTIONIST";
import type { ESLintIntegrationPluginPerfectionistResolvedOptions } from "../options/ESLintIntegrationPluginPerfectionistResolvedOptions";

export async function configureESLintPluginPerfectionistAsync(
  eslintContext: ESLintContext,
  eslintIntegrationOptions: ESLintIntegrationResolvedOptions,
  eslintIntegrationPluginOptions: ESLintIntegrationPluginPerfectionistResolvedOptions,
  linterConfigArray: Linter.Config[],
): Promise<void>
{
  const {
    [LINTER_CONFIG_NAME_PERFECTIONIST_CUSTOM]: customConfigIndexes,
    [LINTER_CONFIG_NAME_PERFECTIONIST_RECOMMENDED_NATURAL]: recommendedNaturalConfigIndexes,
  } = evaluateLinterConfigPredicates(
    linterConfigArray,
    {
      [LINTER_CONFIG_NAME_PERFECTIONIST_CUSTOM]: LINTER_CONFIG_NAME_PERFECTIONIST_CUSTOM,
      [LINTER_CONFIG_NAME_PERFECTIONIST_RECOMMENDED_NATURAL]: LINTER_CONFIG_NAME_PERFECTIONIST_RECOMMENDED_NATURAL,
    },
  );

  const recommendedNaturalConfigExists = recommendedNaturalConfigIndexes.size > 0;
  const customConfigExists = customConfigIndexes.size > 0;

  if (
    recommendedNaturalConfigExists
    && customConfigExists
  )
  {
    return;
  }

  const pluginPerfectionist = await suppressErrorMaybeAsync(
    importDefaultExport<typeof ESLintPluginPerfectionist>,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    async (path: string) => await import(path),
    PACKAGE_NAME_ESLINT_PLUGIN_PERFECTIONIST,
  );

  if (pluginPerfectionist == null)
  {
    return;
  }

  if (!recommendedNaturalConfigExists)
  {
    linterConfigArray.push({
      ...pluginPerfectionist.configs["recommended-natural"],
      files: [
        GLOB_PATTERN_CJS_CJSX_CTS_CTSX,
        GLOB_PATTERN_JS_JSX_TS_TSX,
        GLOB_PATTERN_MJS_MJSX_MTS_MTSX,
      ],
      name: LINTER_CONFIG_NAME_PERFECTIONIST_RECOMMENDED_NATURAL,
    });
  }

  if (!customConfigExists)
  {
    const internalPattern: string[] = [];

    if (eslintIntegrationPluginOptions.internalPattern.overrides != null)
    {
      internalPattern.push(
        ...eslintIntegrationPluginOptions.internalPattern.overrides.map(
          getRegExpSource,
        ),
      );
    }
    else
    {
      for (const workspace of eslintContext.workspaces)
      {
        const workspaceNameRegexp = escapeRegExp(workspace.name);
        const workspacesUnwrappedRegexp = `^(?:${workspaceNameRegexp})(?:(?:[\\/]+)(?:.*))?$`;
        internalPattern.push(workspacesUnwrappedRegexp);
      }
    }

    internalPattern.push(
      ...eslintIntegrationPluginOptions.internalPattern.extra.map(
        getRegExpSource,
      ),
    );

    linterConfigArray.push({
      files: [
        GLOB_PATTERN_CJS_CJSX_CTS_CTSX,
        GLOB_PATTERN_JS_JSX_TS_TSX,
        GLOB_PATTERN_MJS_MJSX_MTS_MTSX,
      ],
      name: LINTER_CONFIG_NAME_PERFECTIONIST_CUSTOM,
      rules: {
        "perfectionist/sort-exports": [
          "error",
          {
            ignoreCase: false,
            specialCharacters: "keep",
            type: "natural",
          },
        ],
        "perfectionist/sort-imports": [
          "error",
          {
            customGroups: [
              {
                elementNamePattern: /^node:.+$/iu.source,
                groupName: "type-node",
                selector: "type",
              },
              {
                elementNamePattern: /^node:.+$/iu.source,
                groupName: "value-node",
              },
            ],
            groups: [
              [
                "type-node",
                "value-node",
                "value-builtin",
              ],
              [
                "type-import",
                "value-external",
              ],
              [
                "type-internal",
                "value-internal",
              ],
              [
                "type-parent",
                "value-parent",
              ],
              [
                "type-sibling",
                "value-sibling",
              ],
              [
                "type-index",
                "value-index",
              ],
              ["ts-equals-import"],
              ["unknown"],
            ],
            ignoreCase: false,
            internalPattern,
            newlinesBetween: 1,
            tsconfig: {
              rootDir: (
                eslintContext.typescript?.tsconfigRootDirectoryPath
                ?? eslintContext.project.path
              ),
            },
          },
        ],
      },
    });
  }
}
