import type { Linter } from "eslint";

import type { ContextAsync } from "@holypack/core/context/ContextAsync";
import type { ContextSync } from "@holypack/core/context/ContextSync";
import { requireExtension } from "@holypack/core/extension/registry/requireExtension";

import type { ESLintContext } from "../../../../context/ESLintContext";
import type { ESLintIntegrationResolvedOptions } from "../../../../options/ESLintIntegrationResolvedOptions";
import { configureESLintPluginJSDocAsync } from "../../configurator/configureESLintPluginJSDocAsync";
import { configureESLintPluginJSDocSync } from "../../configurator/configureESLintPluginJSDocSync";
import { resolveESLintIntegrationPluginJSDocOptions } from "../../options/resolveESLintIntegrationPluginJSDocOptions";
import type { ESLintIntegrationPluginJSDoc } from "../ESLintIntegrationPluginJSDoc";
import { INTEGRATION_UID_ESLINT_PLUGIN_JSDOC } from "../INTEGRATION_UID_ESLINT_PLUGIN_JSDOC";

export class ESLintPluginJSDocConfiguratorFacet
{
  async configure(
    context: ContextAsync,
    eslintContext: ESLintContext,
    eslintIntegrationOptions: ESLintIntegrationResolvedOptions,
    linterConfigArray: Linter.Config[],
  ): Promise<void>
  {
    const eslintIntegrationPlugin = requireExtension<ESLintIntegrationPluginJSDoc>(
      context,
      INTEGRATION_UID_ESLINT_PLUGIN_JSDOC,
    );

    const eslintIntegrationPluginOptions = resolveESLintIntegrationPluginJSDocOptions(
      eslintIntegrationPlugin.options,
    );

    await configureESLintPluginJSDocAsync(
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
    const eslintIntegrationPlugin = requireExtension<ESLintIntegrationPluginJSDoc>(
      context,
      INTEGRATION_UID_ESLINT_PLUGIN_JSDOC,
    );

    const eslintIntegrationPluginOptions = resolveESLintIntegrationPluginJSDocOptions(
      eslintIntegrationPlugin.options,
    );

    configureESLintPluginJSDocSync(
      eslintContext,
      eslintIntegrationOptions,
      eslintIntegrationPluginOptions,
      linterConfigArray,
    );
  }
}
