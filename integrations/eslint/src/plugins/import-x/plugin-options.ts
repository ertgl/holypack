export type ESLintIntegrationImportXPluginOptions = (
  & ESLintIntegrationImportXPluginOptionsBaseProperties
  & ESLintIntegrationImportXPluginOptionsCustomProperties
);

export type ESLintIntegrationImportXPluginOptionsBaseProperties = {
  internalRegex?: null | RegExp | string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ESLintIntegrationImportXPluginOptionsCustomProperties
{}

export type ESLintIntegrationImportXPluginResolvedOptions = (
  & ESLintIntegrationImportXPluginResolvedOptionsBaseProperties
  & ESLintIntegrationImportXPluginResolvedOptionsCustomProperties
);

export type ESLintIntegrationImportXPluginResolvedOptionsBaseProperties = {
  internalRegexSource: null | string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ESLintIntegrationImportXPluginResolvedOptionsCustomProperties
{}
