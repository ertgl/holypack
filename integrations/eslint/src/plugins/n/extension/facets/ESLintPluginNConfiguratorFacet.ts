import type { Linter } from "eslint";

import type { ContextAsync } from "@holypack/core/context/ContextAsync";
import type { ContextSync } from "@holypack/core/context/ContextSync";
import { requireExtension } from "@holypack/core/extension/registry/requireExtension";

import type { ESLintContext } from "../../../../context/ESLintContext";
import type { ESLintIntegrationResolvedOptions } from "../../../../options/ESLintIntegrationResolvedOptions";
import { configureESLintPluginNAsync } from "../../configurator/configureESLintPluginNAsync";
import { configureESLintPluginNSync } from "../../configurator/configureESLintPluginNSync";
import { resolveESLintIntegrationPluginNOptions } from "../../options/resolveESLintIntegrationPluginNOptions";
import type { ESLintIntegrationPluginN } from "../ESLintIntegrationPluginN";
import { INTEGRATION_UID_ESLINT_PLUGIN_N } from "../INTEGRATION_UID_ESLINT_PLUGIN_N";

export class ESLintPluginNConfiguratorFacet
{
  async configure(
    context: ContextAsync,
    eslintContext: ESLintContext,
    eslintIntegrationOptions: ESLintIntegrationResolvedOptions,
    linterConfigArray: Linter.Config[],
  ): Promise<void>
  {
    const eslintIntegrationPlugin = requireExtension<ESLintIntegrationPluginN>(
      context,
      INTEGRATION_UID_ESLINT_PLUGIN_N,
    );

    const eslintIntegrationPluginOptions = resolveESLintIntegrationPluginNOptions(
      eslintIntegrationPlugin.options,
    );

    await configureESLintPluginNAsync(
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
    const eslintIntegrationPlugin = requireExtension<ESLintIntegrationPluginN>(
      context,
      INTEGRATION_UID_ESLINT_PLUGIN_N,
    );

    const eslintIntegrationPluginOptions = resolveESLintIntegrationPluginNOptions(
      eslintIntegrationPlugin.options,
    );

    configureESLintPluginNSync(
      eslintContext,
      eslintIntegrationOptions,
      eslintIntegrationPluginOptions,
      linterConfigArray,
    );
  }
}
