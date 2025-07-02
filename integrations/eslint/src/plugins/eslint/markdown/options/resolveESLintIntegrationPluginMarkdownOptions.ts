import type { Optional } from "@holypack/core/lib/object/Optional";

import { MARKDOWN_FLAVOR_DEFAULT } from "../flavor/MARKDOWN_FLAVOR_DEFAULT";

import type { ESLintIntegrationPluginMarkdownOptions } from "./ESLintIntegrationPluginMarkdownOptions";
import type { ESLintIntegrationPluginMarkdownResolvedOptions } from "./ESLintIntegrationPluginMarkdownResolvedOptions";

export function resolveESLintIntegrationPluginMarkdownOptions(
  options?: Optional<ESLintIntegrationPluginMarkdownOptions>,
): ESLintIntegrationPluginMarkdownResolvedOptions
{
  options ??= {};

  return {
    flavor: options.flavor ?? MARKDOWN_FLAVOR_DEFAULT,
  };
}
