import type { Linter } from "eslint";

import type { ContextAsync } from "@holypack/core/context/ContextAsync";
import type { ContextSync } from "@holypack/core/context/ContextSync";
import { requireExtension } from "@holypack/core/extension/registry/requireExtension";

import type { ESLintContext } from "../../../../context/ESLintContext";
import type { ESLintIntegrationResolvedOptions } from "../../../../options/ESLintIntegrationResolvedOptions";
import { configureESLintPluginYMLAsync } from "../../configurator/configureESLintPluginYMLAsync";
import { configureESLintPluginYMLSync } from "../../configurator/configureESLintPluginYMLSync";
import { resolveESLintIntegrationPluginYMLOptions } from "../../options/resolveESLintIntegrationPluginYMLOptions";
import type { ESLintIntegrationPluginYML } from "../ESLintIntegrationPluginYML";
import { INTEGRATION_UID_ESLINT_PLUGIN_YML } from "../INTEGRATION_UID_ESLINT_PLUGIN_YML";

export class ESLintPluginYMLConfiguratorFacet
{
  async configure(
    context: ContextAsync,
    eslintContext: ESLintContext,
    eslintIntegrationOptions: ESLintIntegrationResolvedOptions,
    linterConfigArray: Linter.Config[],
  ): Promise<void>
  {
    const eslintIntegrationPlugin = requireExtension<ESLintIntegrationPluginYML>(
      context,
      INTEGRATION_UID_ESLINT_PLUGIN_YML,
    );

    const eslintIntegrationPluginOptions = resolveESLintIntegrationPluginYMLOptions(
      eslintIntegrationPlugin.options,
    );

    await configureESLintPluginYMLAsync(
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
    const eslintIntegrationPlugin = requireExtension<ESLintIntegrationPluginYML>(
      context,
      INTEGRATION_UID_ESLINT_PLUGIN_YML,
    );

    const eslintIntegrationPluginOptions = resolveESLintIntegrationPluginYMLOptions(
      eslintIntegrationPlugin.options,
    );

    configureESLintPluginYMLSync(
      eslintContext,
      eslintIntegrationOptions,
      eslintIntegrationPluginOptions,
      linterConfigArray,
    );
  }
}
