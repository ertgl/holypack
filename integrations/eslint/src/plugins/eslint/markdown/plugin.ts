import {
  BaseIntegration,
  type Config,
  type Context,
  requireIntegration,
  type ResolvedContext,
} from "@holypack/core";

import {
  type ESLintIntegration,
  INTEGRATION_NAME_ESLINT,
} from "../../../integration";

import { ESLintIntegrationESLintMarkdownPluginAPI } from "./plugin-api";

export const INTEGRATION_NAME_ESLINT_MARKDOWN = `${INTEGRATION_NAME_ESLINT}/Markdown`;

export class ESLintIntegrationESLintMarkdownPlugin extends BaseIntegration
{
  api: ESLintIntegrationESLintMarkdownPluginAPI;

  name = INTEGRATION_NAME_ESLINT_MARKDOWN;

  constructor()
  {
    super();
    this.api = new ESLintIntegrationESLintMarkdownPluginAPI(this);
  }

  async onESLintConfigGeneration(
    eslintIntegration: ESLintIntegration,
    resolvedContext: ResolvedContext,
  ): Promise<void>
  {
    await this.api.addESLintConfig(
      resolvedContext,
      eslintIntegration,
    );
  }

  setup(
    context: Context,
    config: Config,
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
