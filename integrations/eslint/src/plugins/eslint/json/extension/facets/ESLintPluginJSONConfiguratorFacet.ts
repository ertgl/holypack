import type { Linter } from "eslint";

import type { ContextAsync } from "@holypack/core/context/ContextAsync";
import type { ContextSync } from "@holypack/core/context/ContextSync";
import { requireExtension } from "@holypack/core/extension/registry/requireExtension";

import type { ESLintContext } from "../../../../../context/ESLintContext";
import type { ESLintIntegrationResolvedOptions } from "../../../../../options/ESLintIntegrationResolvedOptions";
import { configureESLintPluginJSONAsync } from "../../configurator/configureESLintPluginJSONAsync";
import { configureESLintPluginJSONSync } from "../../configurator/configureESLintPluginJSONSync";
import { resolveESLintIntegrationPluginJSONOptions } from "../../options/resolveESLintIntegrationPluginJSONOptions";
import type { ESLintIntegrationPluginJSON } from "../ESLintIntegrationPluginJSON";
import { INTEGRATION_UID_ESLINT_PLUGIN_JSON } from "../INTEGRATION_UID_ESLINT_PLUGIN_JSON";

export class ESLintPluginJSONConfiguratorFacet
{
  async configure(
    context: ContextAsync,
    eslintContext: ESLintContext,
    eslintIntegrationOptions: ESLintIntegrationResolvedOptions,
    linterConfigArray: Linter.Config[],
  ): Promise<void>
  {
    const eslintIntegrationPluginJSON = requireExtension<ESLintIntegrationPluginJSON>(
      context,
      INTEGRATION_UID_ESLINT_PLUGIN_JSON,
    );

    const pluginJSONOptions = resolveESLintIntegrationPluginJSONOptions(
      eslintIntegrationPluginJSON.options,
    );

    await configureESLintPluginJSONAsync(
      eslintContext,
      eslintIntegrationOptions,
      pluginJSONOptions,
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
    const eslintIntegrationPluginJSON = requireExtension<ESLintIntegrationPluginJSON>(
      context,
      INTEGRATION_UID_ESLINT_PLUGIN_JSON,
    );

    const pluginJSONOptions = resolveESLintIntegrationPluginJSONOptions(
      eslintIntegrationPluginJSON.options,
    );

    configureESLintPluginJSONSync(
      eslintContext,
      eslintIntegrationOptions,
      pluginJSONOptions,
      linterConfigArray,
    );
  }
}
