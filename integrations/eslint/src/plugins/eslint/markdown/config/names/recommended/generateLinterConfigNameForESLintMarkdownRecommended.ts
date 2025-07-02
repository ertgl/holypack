import { LINTER_CONFIG_NAME_PREFIX_ESLINT_MARKDOWN_RECOMMENDED } from "./LINTER_CONFIG_NAME_PREFIX_ESLINT_MARKDOWN_RECOMMENDED";

export function generateLinterConfigNameForESLintMarkdownRecommended(
  configIdx: number,
): string
{
  return `${LINTER_CONFIG_NAME_PREFIX_ESLINT_MARKDOWN_RECOMMENDED}[${String(configIdx)}]`;
}
