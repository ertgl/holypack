import type { BabelIntegrationTypeScriptPluginOptions } from "../plugin";

declare module "../../../integration/integration-options"
{
  interface BabelIntegrationOptionsCustomProperties
  {
    typescript?: BabelIntegrationTypeScriptPluginOptions | boolean | null;
  }
}

export {};
