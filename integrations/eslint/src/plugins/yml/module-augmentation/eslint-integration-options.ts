import type { ESLintIntegrationYMLPluginOptions } from "../plugin-options";

declare module "../../../integration/integration-options"
{
  interface ESLintIntegrationOptionsCustomProperties
  {
    yml?: ESLintIntegrationYMLPluginOptions | null;
  }

  interface ESLintIntegrationResolvedOptionsCustomProperties
  {
    yml: ESLintIntegrationYMLPluginOptions;
  }
}

export {};
