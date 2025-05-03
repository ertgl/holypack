import type { BabelIntegrationEnvPluginOptions } from "../plugin";

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
