import type { ESLintIntegrationJSDocPluginOptions } from "../plugin-options";

declare module "../../../integration/integration-options"
{
  interface ESLintIntegrationOptionsCustomProperties
  {
    jsdoc?: boolean | ESLintIntegrationJSDocPluginOptions | null;
  }

  interface ESLintIntegrationResolvedOptionsCustomProperties
  {
    jsdoc: ESLintIntegrationJSDocPluginOptions;
  }
}

export {};
