import type { ESLintIntegrationESLintJSPluginOptions } from "../plugin-options";

declare module "../../../../integration/integration-options"
{
  interface ESLintIntegrationOptionsCustomProperties
  {
    js?: ESLintIntegrationESLintJSPluginOptions | null;
  }

  interface ESLintIntegrationResolvedOptionsCustomProperties
  {
    js: ESLintIntegrationESLintJSPluginOptions;
  }
}

export {};
