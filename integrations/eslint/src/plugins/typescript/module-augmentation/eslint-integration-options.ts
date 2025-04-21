import type { ESLintIntegrationTypeScriptPluginOptions } from "../plugin-options";

declare module "../../../integration/integration-options"
{
  interface ESLintIntegrationOptionsCustomProperties
  {
    typescript?: boolean | ESLintIntegrationTypeScriptPluginOptions | null;
  }

  interface ESLintIntegrationResolvedOptionsCustomProperties
  {
    typescript: ESLintIntegrationTypeScriptPluginOptions;
  }
}

export {};
