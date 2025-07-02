import type { Linter } from "eslint";

import type { ContextAsync } from "@holypack/core/context/ContextAsync";
import type { ContextSync } from "@holypack/core/context/ContextSync";
import { requireExtension } from "@holypack/core/extension/registry/requireExtension";
import type { ESLintContext } from "@holypack/integration-eslint/context/ESLintContext.cjs";
import type { ESLintIntegrationResolvedOptions } from "@holypack/integration-eslint/options/ESLintIntegrationResolvedOptions.cjs";

import { INTEGRATION_UID_JEST } from "../../../../extension/INTEGRATION_UID_JEST";
import type { JestIntegration } from "../../../../extension/JestIntegration";
import { resolveJestIntegrationOptions } from "../../../../options/resolveJestIntegrationOptions";
import { configureJestPluginESLintAsync } from "../../configurator/configureJestPluginESLintAsync";
import { configureJestPluginESLintSync } from "../../configurator/configureJestPluginESLintSync";
import { resolveJestIntegrationPluginESLintOptions } from "../../options/resolveJestIntegrationPluginESLintOptions";
import { INTEGRATION_UID_JEST_PLUGIN_ESLINT } from "../INTEGRATION_UID_JEST_PLUGIN_ESLINT";
import type { JestIntegrationPluginESLint } from "../JestIntegrationPluginESLint";

export class JestIntegrationPluginESLintConfiguratorFacet
{
  async configure(
    context: ContextAsync,
    eslintContext: ESLintContext,
    eslintIntegrationOptions: ESLintIntegrationResolvedOptions,
    linterConfigArray: Linter.Config[],
  ): Promise<void>
  {
    const jestIntegration = requireExtension<JestIntegration>(
      context,
      INTEGRATION_UID_JEST,
    );

    const jestIntegrationOptions = resolveJestIntegrationOptions(
      jestIntegration.options,
    );

    const jestIntegrationPluginESLint = requireExtension<JestIntegrationPluginESLint>(
      context,
      INTEGRATION_UID_JEST_PLUGIN_ESLINT,
    );

    const jestIntegrationPluginOptions = resolveJestIntegrationPluginESLintOptions(
      jestIntegrationPluginESLint.options,
    );

    await configureJestPluginESLintAsync(
      eslintContext,
      eslintIntegrationOptions,
      jestIntegrationOptions,
      jestIntegrationPluginOptions,
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
    const jestIntegration = requireExtension<JestIntegration>(
      context,
      INTEGRATION_UID_JEST,
    );

    const jestIntegrationOptions = resolveJestIntegrationOptions(
      jestIntegration.options,
    );

    const jestIntegrationPluginESLint = requireExtension<JestIntegrationPluginESLint>(
      context,
      INTEGRATION_UID_JEST_PLUGIN_ESLINT,
    );

    const jestIntegrationPluginOptions = resolveJestIntegrationPluginESLintOptions(
      jestIntegrationPluginESLint.options,
    );

    configureJestPluginESLintSync(
      eslintContext,
      eslintIntegrationOptions,
      jestIntegrationOptions,
      jestIntegrationPluginOptions,
      linterConfigArray,
    );
  }
}
