import type { Linter } from "eslint";

import type { ContextAsync } from "@holypack/core/context/ContextAsync";
import type { ContextSync } from "@holypack/core/context/ContextSync";
import { requireExtension } from "@holypack/core/extension/registry/requireExtension";

import type { ESLintContext } from "../../../../../context/ESLintContext";
import type { ESLintIntegrationResolvedOptions } from "../../../../../options/ESLintIntegrationResolvedOptions";
import { configureESLintPluginMarkdownAsync } from "../../configurator/configureESLintPluginMarkdownAsync";
import { configureESLintPluginMarkdownSync } from "../../configurator/configureESLintPluginMarkdownSync";
import { resolveESLintIntegrationPluginMarkdownOptions } from "../../options/resolveESLintIntegrationPluginMarkdownOptions";
import type { ESLintIntegrationPluginMarkdown } from "../ESLintIntegrationPluginMarkdown";
import { INTEGRATION_UID_ESLINT_PLUGIN_MARKDOWN } from "../INTEGRATION_UID_ESLINT_PLUGIN_MARKDOWN";

export class ESLintPluginMarkdownConfiguratorFacet
{
  async configure(
    context: ContextAsync,
    eslintContext: ESLintContext,
    eslintIntegrationOptions: ESLintIntegrationResolvedOptions,
    linterConfigArray: Linter.Config[],
  ): Promise<void>
  {
    const eslintIntegrationPluginMarkdown = requireExtension<ESLintIntegrationPluginMarkdown>(
      context,
      INTEGRATION_UID_ESLINT_PLUGIN_MARKDOWN,
    );

    const pluginMarkdownOptions = resolveESLintIntegrationPluginMarkdownOptions(
      eslintIntegrationPluginMarkdown.options,
    );

    await configureESLintPluginMarkdownAsync(
      eslintContext,
      eslintIntegrationOptions,
      pluginMarkdownOptions,
      linterConfigArray,
    );
  }

  configureSync(
    context: ContextSync,
    eslintContext: ESLintContext,
    eslintIntegrationOptions: ESLintIntegrationResolvedOptions,
    linterConfigArray: Linter.Config[],
  ): void
  {
    const eslintIntegrationPluginMarkdown = requireExtension<ESLintIntegrationPluginMarkdown>(
      context,
      INTEGRATION_UID_ESLINT_PLUGIN_MARKDOWN,
    );

    const pluginMarkdownOptions = resolveESLintIntegrationPluginMarkdownOptions(
      eslintIntegrationPluginMarkdown.options,
    );

    configureESLintPluginMarkdownSync(
      eslintContext,
      eslintIntegrationOptions,
      pluginMarkdownOptions,
      linterConfigArray,
    );
  }
}
