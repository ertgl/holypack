import type { ESLintIntegrationESLintMarkdownPluginOptions } from "../plugin-options";

declare module "../../../../integration/integration-options"
{
  interface ESLintIntegrationOptionsCustomProperties
  {
    markdown?: ESLintIntegrationESLintMarkdownPluginOptions | null;
  }

  interface ESLintIntegrationResolvedOptionsCustomProperties
  {
    markdown: ESLintIntegrationESLintMarkdownPluginOptions;
  }
}

export {};
