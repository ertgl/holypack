import type { ESLintIntegrationPerfectionistPluginOptions } from "../plugin-options";

declare module "../../../integration/integration-options"
{
  interface ESLintIntegrationOptionsCustomProperties
  {
    perfectionist?: ESLintIntegrationPerfectionistPluginOptions | null;
  }

  interface ESLintIntegrationResolvedOptionsCustomProperties
  {
    perfectionist: ESLintIntegrationPerfectionistPluginOptions;
  }
}

export {};
