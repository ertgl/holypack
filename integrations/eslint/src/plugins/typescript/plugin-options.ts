export type ESLintIntegrationTypeScriptPluginOptions = (
  & ESLintIntegrationTypeScriptPluginOptionsBaseProperties
  & ESLintIntegrationTypeScriptPluginOptionsCustomProperties
);

export type ESLintIntegrationTypeScriptPluginOptionsBaseProperties = {
  tsconfigRootDir?: null | string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ESLintIntegrationTypeScriptPluginOptionsCustomProperties
{}

export type ESLintIntegrationTypeScriptPluginResolvedOptions = (
  & ESLintIntegrationTypeScriptPluginResolvedOptionsBaseProperties
  & ESLintIntegrationTypeScriptPluginResolvedOptionsCustomProperties
);

export type ESLintIntegrationTypeScriptPluginResolvedOptionsBaseProperties = {
  tsconfigRootDir: string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ESLintIntegrationTypeScriptPluginResolvedOptionsCustomProperties
{}
