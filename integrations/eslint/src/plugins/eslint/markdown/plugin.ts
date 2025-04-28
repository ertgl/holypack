import type { Linter } from "eslint";

import {
  Integration,
  requireIntegration,
  type StrictConfig,
  type StrictContext,
} from "@holypack/core";

import { type ESLintIntegration } from "../../../integration";
import { INTEGRATION_NAME_ESLINT } from "../../../integration/integration-name";

import { ESLintIntegrationESLintMarkdownPluginAPI } from "./plugin-api";

export const INTEGRATION_NAME_ESLINT_MARKDOWN = `${INTEGRATION_NAME_ESLINT}/ESLint/Markdown`;

export class ESLintIntegrationESLintMarkdownPlugin implements Integration
{
  api: ESLintIntegrationESLintMarkdownPluginAPI;

  name = INTEGRATION_NAME_ESLINT_MARKDOWN;

  constructor()
  {
    this.api = new ESLintIntegrationESLintMarkdownPluginAPI(this);
  }

  async onESLintConfigGeneration(
    eslintIntegration: ESLintIntegration,
    context: StrictContext,
    configs: Linter.Config[],
  ): Promise<void>
  {
    await this.api.contributeToESLintConfigs(
      context,
      configs,
      eslintIntegration.options.markdown,
    );
  }

  setup(
    context: StrictContext,
    config: StrictConfig,
  ): void
  {
    const eslintIntegration = requireIntegration<
      ESLintIntegration
    >(
      context,
      INTEGRATION_NAME_ESLINT,
    );

    eslintIntegration.hooks.configGeneration.tapPromise(
      INTEGRATION_NAME_ESLINT_MARKDOWN,
      this.onESLintConfigGeneration.bind(
        this,
        eslintIntegration,
      ),
    );
  }
}

export function createESLintIntegrationESLintMarkdownPlugin(): ESLintIntegrationESLintMarkdownPlugin
{
  return new ESLintIntegrationESLintMarkdownPlugin();
}
