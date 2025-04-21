import type { ESLintIntegrationJSONPluginOptions } from "../plugin-options";

declare module "../../../integration/integration-options"
{
  interface ESLintIntegrationOptionsCustomProperties
  {
    json?: ESLintIntegrationJSONPluginOptions | null;
  }

  interface ESLintIntegrationResolvedOptionsCustomProperties
  {
    json: ESLintIntegrationJSONPluginOptions;
  }
}

export {};
