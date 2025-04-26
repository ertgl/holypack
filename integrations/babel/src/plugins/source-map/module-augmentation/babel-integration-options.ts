import type { BabelIntegrationSourceMapPluginOptions } from "../plugin-options";

declare module "../../../integration/integration-options"
{
  interface BabelIntegrationOptionsCustomProperties
  {
    sourceMap?: BabelIntegrationSourceMapPluginOptions | boolean | null;
  }

  interface BabelIntegrationResolvedOptionsCustomProperties
  {
    sourceMap: BabelIntegrationSourceMapPluginOptions;
  }
}

export {};
