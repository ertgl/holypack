export type ESLintIntegrationIgnoresPluginOptions = (
  & ESLintIntegrationIgnoresPluginOptionsBaseProperties
  & ESLintIntegrationIgnoresPluginOptionsCustomProperties
);

export type ESLintIntegrationIgnoresPluginOptionsBaseProperties = {
  commonPatterns?: null | string[];
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ESLintIntegrationIgnoresPluginOptionsCustomProperties
{}

export type ESLintIntegrationIgnoresPluginResolvedOptions = (
  & ESLintIntegrationIgnoresPluginResolvedOptionsBaseProperties
  & ESLintIntegrationIgnoresPluginResolvedOptionsCustomProperties
);

export type ESLintIntegrationIgnoresPluginResolvedOptionsBaseProperties = {
  commonPatterns: string[];
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ESLintIntegrationIgnoresPluginResolvedOptionsCustomProperties
{}
