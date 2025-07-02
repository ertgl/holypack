import type ESLintMarkdown from "@eslint/markdown";
import type { Linter } from "eslint";

import { importDefaultExport } from "@holypack/core/lib/module/importDefaultExport";
import { suppressErrorMaybeAsync } from "@holypack/core/lib/runtime/suppressErrorMaybeAsync";

import { evaluateLinterConfigPredicates } from "../../../../config/evaluateLinterConfigPredicates";
import { GLOB_PATTERN_MD } from "../../../../config/glob-patterns/GLOB_PATTERN_MD";
import type { ESLintContext } from "../../../../context/ESLintContext";
import type { ESLintIntegrationResolvedOptions } from "../../../../options/ESLintIntegrationResolvedOptions";
import { LINTER_CONFIG_NAME_ESLINT_MARKDOWN_GFM_LABEL_REFS_FIX } from "../config/names/gfm-label-refs-fix/LINTER_CONFIG_NAME_ESLINT_MARKDOWN_GFM_LABEL_REFS_FIX";
import { generateLinterConfigNameForESLintMarkdownRecommended } from "../config/names/recommended/generateLinterConfigNameForESLintMarkdownRecommended";
import { isLinterConfigESLintMarkdownRecommended } from "../config/names/recommended/isLinterConfigESLintMarkdownRecommended";
import { LINTER_CONFIG_NAME_PREFIX_ESLINT_MARKDOWN_RECOMMENDED } from "../config/names/recommended/LINTER_CONFIG_NAME_PREFIX_ESLINT_MARKDOWN_RECOMMENDED";
import { MARKDOWN_FLAVOR_GFM } from "../flavor/MARKDOWN_FLAVOR_GFM";
import { PACKAGE_NAME_ESLINT_MARKDOWN } from "../module/PACKAGE_NAME_ESLINT_MARKDOWN";
import type { ESLintIntegrationPluginMarkdownResolvedOptions } from "../options/ESLintIntegrationPluginMarkdownResolvedOptions";

export async function configureESLintPluginMarkdownAsync(
  eslintContext: ESLintContext,
  eslintIntegrationOptions: ESLintIntegrationResolvedOptions,
  eslintIntegrationPluginOptions: ESLintIntegrationPluginMarkdownResolvedOptions,
  linterConfigArray: Linter.Config[],
): Promise<void>
{
  const {
    [LINTER_CONFIG_NAME_ESLINT_MARKDOWN_GFM_LABEL_REFS_FIX]: gfmLabelRefsFixConfigIndexes,
    [LINTER_CONFIG_NAME_PREFIX_ESLINT_MARKDOWN_RECOMMENDED]: recommendedConfigIndexes,
  } = evaluateLinterConfigPredicates(
    linterConfigArray,
    {
      [LINTER_CONFIG_NAME_ESLINT_MARKDOWN_GFM_LABEL_REFS_FIX]: LINTER_CONFIG_NAME_ESLINT_MARKDOWN_GFM_LABEL_REFS_FIX,
      [LINTER_CONFIG_NAME_PREFIX_ESLINT_MARKDOWN_RECOMMENDED]: isLinterConfigESLintMarkdownRecommended,
    },
  );

  const recommendedConfigExists = recommendedConfigIndexes.size > 0;
  const gfmLabelRefsFixConfigExists = gfmLabelRefsFixConfigIndexes.size > 0;

  if (recommendedConfigExists && gfmLabelRefsFixConfigExists)
  {
    return;
  }

  const eslintMarkdown = await suppressErrorMaybeAsync(
    importDefaultExport<typeof ESLintMarkdown>,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    async (path: string) => await import(path),
    PACKAGE_NAME_ESLINT_MARKDOWN,
  );

  if (eslintMarkdown == null)
  {
    return;
  }

  if (!recommendedConfigExists)
  {
    for (
      let configIdx = 0;
      configIdx < eslintMarkdown.configs.recommended.length;
      configIdx++
    )
    {
      const config = eslintMarkdown.configs.recommended[configIdx];

      const recommendedConfigName = generateLinterConfigNameForESLintMarkdownRecommended(
        configIdx,
      );

      linterConfigArray.push({
        ...config,
        files: [
          GLOB_PATTERN_MD,
        ],
        language: eslintIntegrationPluginOptions.flavor,
        name: recommendedConfigName,
      });
    }
  }

  if (
    eslintIntegrationPluginOptions.flavor === MARKDOWN_FLAVOR_GFM
    && !gfmLabelRefsFixConfigExists
  )
  {
    linterConfigArray.push({
      files: [
        GLOB_PATTERN_MD,
      ],
      name: LINTER_CONFIG_NAME_ESLINT_MARKDOWN_GFM_LABEL_REFS_FIX,
      rules: {
        // TODO(ertgl): Re-enable `markdown/no-missing-label-refs` ESLint rule when the related issue is fixed.
        /**
         * @see https://github.com/eslint/markdown/issues/294
         */
        "markdown/no-missing-label-refs": "off",
      },
    });
  }
}
