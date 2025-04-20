import type { ESLintIntegrationTypeScriptPluginOptions } from "../plugin-options";

declare module "../../../integration/integration-options"
{
  interface ESLintIntegrationOptionsCustomProperties
  {
    typescript?: ESLintIntegrationTypeScriptPluginOptions | null;
  }

  interface ESLintIntegrationResolvedOptionsCustomProperties
  {
    typescript: ESLintIntegrationTypeScriptPluginOptions;
  }
}

export {};
