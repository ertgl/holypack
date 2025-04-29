import type { JestIntegrationConfigPluginOptions } from "../plugin-options";

declare module "../../../integration/integration-options"
{
  interface JestIntegrationOptionsCustomProperties
  {
    config?: boolean | JestIntegrationConfigPluginOptions | null;
  }

  interface JestIntegrationResolvedOptionsCustomProperties
  {
    config: JestIntegrationConfigPluginOptions;
  }
}

export {};
