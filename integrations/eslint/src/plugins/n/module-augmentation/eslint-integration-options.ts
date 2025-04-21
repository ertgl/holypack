import type { ESLintIntegrationNPluginOptions } from "../plugin-options";

declare module "../../../integration/integration-options"
{
  interface ESLintIntegrationOptionsCustomProperties
  {
    n?: boolean | ESLintIntegrationNPluginOptions | null;
  }

  interface ESLintIntegrationResolvedOptionsCustomProperties
  {
    n: ESLintIntegrationNPluginOptions;
  }
}

export {};
