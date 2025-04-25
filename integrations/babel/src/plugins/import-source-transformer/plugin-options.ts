import type { BabelImportSourceTransformerPluginOptions } from "./config";

export type BabelIntegrationImportSourceTransformerPluginOptions = (
  & BabelIntegrationImportSourceTransformerPluginOptionsBaseProperties
  & BabelIntegrationImportSourceTransformerPluginOptionsCustomProperties
);

export type BabelIntegrationImportSourceTransformerPluginOptionsBaseProperties = {
  overrides?: Partial<BabelImportSourceTransformerPluginOptions>;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BabelIntegrationImportSourceTransformerPluginOptionsCustomProperties
{}

export type BabelIntegrationImportSourceTransformerPluginResolvedOptions = (
  & BabelIntegrationImportSourceTransformerPluginResolvedOptionsBaseProperties
  & BabelIntegrationImportSourceTransformerPluginResolvedOptionsCustomProperties
);

export type BabelIntegrationImportSourceTransformerPluginResolvedOptionsBaseProperties = {
  overrides: BabelImportSourceTransformerPluginOptions;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BabelIntegrationImportSourceTransformerPluginResolvedOptionsCustomProperties
{}
