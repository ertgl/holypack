import type { ESLintIntegrationESLintJSONPluginOptions } from "../plugin-options";

declare module "../../../../integration/integration-options"
{
  interface ESLintIntegrationOptionsCustomProperties
  {
    json?: boolean | ESLintIntegrationESLintJSONPluginOptions | null;
  }

  interface ESLintIntegrationResolvedOptionsCustomProperties
  {
    json: ESLintIntegrationESLintJSONPluginOptions;
  }
}

export {};
