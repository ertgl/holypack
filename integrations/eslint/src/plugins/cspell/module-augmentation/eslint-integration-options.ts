import type { ESLintIntegrationCSpellPluginOptions } from "../plugin-options";

declare module "../../../integration/integration-options"
{
  interface ESLintIntegrationOptionsCustomProperties
  {
    cspell?: boolean | ESLintIntegrationCSpellPluginOptions | null;
  }

  interface ESLintIntegrationResolvedOptionsCustomProperties
  {
    cspell: ESLintIntegrationCSpellPluginOptions;
  }
}

export {};
