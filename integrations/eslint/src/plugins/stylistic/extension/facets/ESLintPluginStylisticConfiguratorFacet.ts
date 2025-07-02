import type { Linter } from "eslint";

import type { ContextAsync } from "@holypack/core/context/ContextAsync";
import type { ContextSync } from "@holypack/core/context/ContextSync";
import { requireExtension } from "@holypack/core/extension/registry/requireExtension";

import type { ESLintContext } from "../../../../context/ESLintContext";
import type { ESLintIntegrationResolvedOptions } from "../../../../options/ESLintIntegrationResolvedOptions";
import { configureESLintPluginStylisticAsync } from "../../configurator/configureESLintPluginStylisticAsync";
import { configureESLintPluginStylisticSync } from "../../configurator/configureESLintPluginStylisticSync";
import { resolveESLintIntegrationPluginStylisticOptions } from "../../options/resolveESLintIntegrationPluginStylisticOptions";
import type { ESLintIntegrationPluginStylistic } from "../ESLintIntegrationPluginStylistic";
import { INTEGRATION_UID_ESLINT_PLUGIN_STYLISTIC } from "../INTEGRATION_UID_ESLINT_PLUGIN_STYLISTIC";

export class ESLintPluginStylisticConfiguratorFacet
{
  async configure(
    context: ContextAsync,
    eslintContext: ESLintContext,
    eslintIntegrationOptions: ESLintIntegrationResolvedOptions,
    linterConfigArray: Linter.Config[],
  ): Promise<void>
  {
    const eslintIntegrationPlugin = requireExtension<ESLintIntegrationPluginStylistic>(
      context,
      INTEGRATION_UID_ESLINT_PLUGIN_STYLISTIC,
    );

    const eslintIntegrationPluginOptions = resolveESLintIntegrationPluginStylisticOptions(
      eslintIntegrationPlugin.options,
    );

    await configureESLintPluginStylisticAsync(
      eslintContext,
      eslintIntegrationOptions,
      eslintIntegrationPluginOptions,
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
    const eslintIntegrationPlugin = requireExtension<ESLintIntegrationPluginStylistic>(
      context,
      INTEGRATION_UID_ESLINT_PLUGIN_STYLISTIC,
    );

    const eslintIntegrationPluginOptions = resolveESLintIntegrationPluginStylisticOptions(
      eslintIntegrationPlugin.options,
    );

    configureESLintPluginStylisticSync(
      eslintContext,
      eslintIntegrationOptions,
      eslintIntegrationPluginOptions,
      linterConfigArray,
    );
  }
}
