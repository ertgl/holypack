import type { Optional } from "@holypack/core/lib/object/Optional";

import type { ESLintIntegrationPluginMarkdownOptions } from "../options/ESLintIntegrationPluginMarkdownOptions";

import { ESLintIntegrationPluginMarkdown } from "./ESLintIntegrationPluginMarkdown";

export function createESLintIntegrationPluginMarkdown(
  options?: Optional<ESLintIntegrationPluginMarkdownOptions>,
): ESLintIntegrationPluginMarkdown
{
  return new ESLintIntegrationPluginMarkdown(options);
}
