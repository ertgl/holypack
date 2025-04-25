import type { BabelIntegrationTypeScriptPluginOptions } from "../plugin-options";

declare module "../../../integration/integration-options"
{
  interface BabelIntegrationOptionsCustomProperties
  {
    typescript?: BabelIntegrationTypeScriptPluginOptions | boolean | null;
  }

  interface BabelIntegrationResolvedOptionsCustomProperties
  {
    typescript: BabelIntegrationTypeScriptPluginOptions;
  }
}

export {};
