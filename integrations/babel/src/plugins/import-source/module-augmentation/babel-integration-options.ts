import type { BabelIntegrationImportSourcePluginOptions } from "../plugin";

declare module "../../../integration/integration-options"
{
  interface BabelIntegrationOptionsCustomProperties
  {
    importSources?: BabelIntegrationImportSourcePluginOptions | boolean | null;
  }
}

export {};
