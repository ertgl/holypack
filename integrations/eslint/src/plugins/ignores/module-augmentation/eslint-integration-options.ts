import type { ESLintIntegrationIgnoresPluginOptions } from "../plugin-options";

declare module "../../../integration/integration-options"
{
  interface ESLintIntegrationOptionsCustomProperties
  {
    ignores?: boolean | ESLintIntegrationIgnoresPluginOptions | null;
  }

  interface ESLintIntegrationResolvedOptionsCustomProperties
  {
    ignores: ESLintIntegrationIgnoresPluginOptions;
  }
}

export {};
