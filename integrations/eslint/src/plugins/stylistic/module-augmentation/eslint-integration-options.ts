import type { ESLintIntegrationStylisticPluginOptions } from "../plugin-options";

declare module "../../../integration/integration-options"
{
  interface ESLintIntegrationOptionsCustomProperties
  {
    stylistic?: ESLintIntegrationStylisticPluginOptions | null;
  }

  interface ESLintIntegrationResolvedOptionsCustomProperties
  {
    stylistic: ESLintIntegrationStylisticPluginOptions;
  }
}

export {};
