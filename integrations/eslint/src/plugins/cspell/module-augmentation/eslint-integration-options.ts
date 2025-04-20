import type { ESLintIntegrationCSpellPluginOptions } from "../plugin-options";

declare module "../../../integration/integration-options"
{
  interface ESLintIntegrationOptionsCustomProperties
  {
    cspell?: ESLintIntegrationCSpellPluginOptions | null;
  }

  interface ESLintIntegrationResolvedOptionsCustomProperties
  {
    cspell: ESLintIntegrationCSpellPluginOptions;
  }
}

export {};
