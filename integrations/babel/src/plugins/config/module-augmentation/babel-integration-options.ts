import type { BabelIntegrationConfigPluginOptions } from "../plugin-options";

declare module "../../../integration/integration-options"
{
  interface BabelIntegrationOptionsCustomProperties
  {
    config?: BabelIntegrationConfigPluginOptions | boolean | null;
  }

  interface BabelIntegrationResolvedOptionsCustomProperties
  {
    config: BabelIntegrationConfigPluginOptions;
  }
}

export {};
