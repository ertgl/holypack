import type { BabelIntegrationEnvPluginOptions } from "../plugin-options";

declare module "../../../integration/integration-options"
{
  interface BabelIntegrationOptionsCustomProperties
  {
    env?: BabelIntegrationEnvPluginOptions | boolean | null;
  }

  interface BabelIntegrationResolvedOptionsCustomProperties
  {
    env: BabelIntegrationEnvPluginOptions;
  }
}

export {};
