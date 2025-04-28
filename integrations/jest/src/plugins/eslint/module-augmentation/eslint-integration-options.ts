import type { JestIntegrationESLintPluginOptions } from "../plugin-options";

declare module "@holypack/integration-eslint"
{
  interface ESLintIntegrationOptionsCustomProperties
  {
    jest?: boolean | JestIntegrationESLintPluginOptions | null;
  }
}

export {};
