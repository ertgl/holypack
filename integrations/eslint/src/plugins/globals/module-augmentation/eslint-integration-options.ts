import type { ESLintIntegrationGlobalsPluginOptions } from "../plugin-options";

declare module "../../../integration/integration-options"
{
  interface ESLintIntegrationOptionsCustomProperties
  {
    globals?: boolean | ESLintIntegrationGlobalsPluginOptions | null;
  }

  interface ESLintIntegrationResolvedOptionsCustomProperties
  {
    globals: ESLintIntegrationGlobalsPluginOptions;
  }
}

export {};
