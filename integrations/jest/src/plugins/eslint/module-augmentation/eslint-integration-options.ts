import type { JestIntegrationESLintPluginOptions } from "../plugin-options";

declare module "@holypack/integration-eslint"
{
  interface ESLintIntegrationOptionsCustomProperties
  {
    jest: JestIntegrationESLintPluginOptions;
  }

  interface JestIntegrationOptionsCustomProperties
  {
    jest?: boolean | JestIntegrationESLintPluginOptions | null;
  }
}

export {};
