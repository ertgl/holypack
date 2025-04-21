import type { ESLintIntegrationImportXPluginOptions } from "../plugin-options";

declare module "../../../integration/integration-options"
{
  interface ESLintIntegrationOptionsCustomProperties
  {
    importX?: ESLintIntegrationImportXPluginOptions | null;
  }

  interface ESLintIntegrationResolvedOptionsCustomProperties
  {
    importX: ESLintIntegrationImportXPluginOptions;
  }
}

export {};
