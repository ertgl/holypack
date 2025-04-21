import type { ESLintIntegrationESLintJSPluginOptions } from "../plugin-options";

declare module "../../../../integration/integration-options"
{
  interface ESLintIntegrationOptionsCustomProperties
  {
    js?: boolean | ESLintIntegrationESLintJSPluginOptions | null;
  }

  interface ESLintIntegrationResolvedOptionsCustomProperties
  {
    js: ESLintIntegrationESLintJSPluginOptions;
  }
}

export {};
