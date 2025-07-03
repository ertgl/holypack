import type { Linter } from "eslint";

import { LINTER_CONFIG_NAME_PREFIX_ESLINT_MARKDOWN_RECOMMENDED } from "./LINTER_CONFIG_NAME_PREFIX_ESLINT_MARKDOWN_RECOMMENDED";

export function isLinterConfigESLintMarkdownRecommended(
  config: Linter.Config,
): boolean
{
  return (
    config.name?.startsWith(
      LINTER_CONFIG_NAME_PREFIX_ESLINT_MARKDOWN_RECOMMENDED,
    )
    ?? false
  );
}
