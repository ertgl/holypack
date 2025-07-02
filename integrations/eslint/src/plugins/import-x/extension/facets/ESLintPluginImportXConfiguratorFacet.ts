import type { Linter } from "eslint";

import type { ContextAsync } from "@holypack/core/context/ContextAsync";
import type { ContextSync } from "@holypack/core/context/ContextSync";
import { requireExtension } from "@holypack/core/extension/registry/requireExtension";

import type { ESLintContext } from "../../../../context/ESLintContext";
import type { ESLintIntegrationResolvedOptions } from "../../../../options/ESLintIntegrationResolvedOptions";
import { configureESLintPluginImportXAsync } from "../../configurator/configureESLintPluginImportXAsync";
import { configureESLintPluginImportXSync } from "../../configurator/configureESLintPluginImportXSync";
import { resolveESLintIntegrationPluginImportXOptions } from "../../options/resolveESLintIntegrationPluginImportXOptions";
import type { ESLintIntegrationPluginImportX } from "../ESLintIntegrationPluginImportX";
import { INTEGRATION_UID_ESLINT_PLUGIN_IMPORT_X } from "../INTEGRATION_UID_ESLINT_PLUGIN_IMPORT_X";

export class ESLintPluginImportXConfiguratorFacet
{
  async configure(
    context: ContextAsync,
    eslintContext: ESLintContext,
    eslintIntegrationOptions: ESLintIntegrationResolvedOptions,
    linterConfigArray: Linter.Config[],
  ): Promise<void>
  {
    const eslintIntegrationPlugin = requireExtension<ESLintIntegrationPluginImportX>(
      context,
      INTEGRATION_UID_ESLINT_PLUGIN_IMPORT_X,
    );

    const eslintIntegrationPluginOptions = resolveESLintIntegrationPluginImportXOptions(
      eslintIntegrationPlugin.options,
    );

    await configureESLintPluginImportXAsync(
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
    const eslintIntegrationPlugin = requireExtension<ESLintIntegrationPluginImportX>(
      context,
      INTEGRATION_UID_ESLINT_PLUGIN_IMPORT_X,
    );

    const eslintIntegrationPluginOptions = resolveESLintIntegrationPluginImportXOptions(
      eslintIntegrationPlugin.options,
    );

    configureESLintPluginImportXSync(
      eslintContext,
      eslintIntegrationOptions,
      eslintIntegrationPluginOptions,
      linterConfigArray,
    );
  }
}
