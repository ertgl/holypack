export type ESLintIntegrationIgnoresPluginOptions = (
  & ESLintIntegrationIgnoresPluginOptionsBaseProperties
  & ESLintIntegrationIgnoresPluginOptionsCustomProperties
);

export type ESLintIntegrationIgnoresPluginOptionsBaseProperties = {
  commonDirectoryPatterns?: null | string[];
  commonFilePatterns?: null | string[];
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ESLintIntegrationIgnoresPluginOptionsCustomProperties
{}

export type ESLintIntegrationIgnoresPluginResolvedOptions = (
  & ESLintIntegrationIgnoresPluginResolvedOptionsBaseProperties
  & ESLintIntegrationIgnoresPluginResolvedOptionsCustomProperties
);

export type ESLintIntegrationIgnoresPluginResolvedOptionsBaseProperties = {
  commonDirectoryPatterns: string[];
  commonFilePatterns: string[];
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ESLintIntegrationIgnoresPluginResolvedOptionsCustomProperties
{}
