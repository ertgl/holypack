import type { BabelIntegrationImportSourceTransformerPluginOptions } from "../plugin-options";

declare module "../../../integration/integration-options"
{
  interface BabelIntegrationOptionsCustomProperties
  {
    importSourceTransformer?: BabelIntegrationImportSourceTransformerPluginOptions | boolean | null;
  }

  interface BabelIntegrationResolvedOptionsCustomProperties
  {
    importSourceTransformer: BabelIntegrationImportSourceTransformerPluginOptions;
  }
}

export {};
