export type BabelIntegrationSourceMapPluginOptions = (
  & BabelIntegrationSourceMapPluginOptionsBaseProperties
  & BabelIntegrationSourceMapPluginOptionsCustomProperties
);

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type BabelIntegrationSourceMapPluginOptionsBaseProperties = {};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BabelIntegrationSourceMapPluginOptionsCustomProperties
{}

export type BabelIntegrationSourceMapPluginResolvedOptions = (
  & BabelIntegrationSourceMapPluginResolvedOptionsBaseProperties
  & BabelIntegrationSourceMapPluginResolvedOptionsCustomProperties
);

export type BabelIntegrationSourceMapPluginResolvedOptionsBaseProperties = {
  isEnabled: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BabelIntegrationSourceMapPluginResolvedOptionsCustomProperties
{}
