export type ESLintIntegrationPerfectionistPluginOptions = (
  & ESLintIntegrationPerfectionistPluginOptionsBaseProperties
  & ESLintIntegrationPerfectionistPluginOptionsCustomProperties
);

export type ESLintIntegrationPerfectionistPluginOptionsBaseProperties = {
  commentPatternsForPartition?: unknown;
  internalPattern?: (RegExp | string)[] | null | RegExp | string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ESLintIntegrationPerfectionistPluginOptionsCustomProperties
{}

export type ESLintIntegrationPerfectionistPluginResolvedOptions = (
  & ESLintIntegrationPerfectionistPluginResolvedOptionsBaseProperties
  & ESLintIntegrationPerfectionistPluginResolvedOptionsCustomProperties
);

export type ESLintIntegrationPerfectionistPluginResolvedOptionsBaseProperties = {
  commentPatternsForPartition: unknown;
  internalPattern: string[];
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ESLintIntegrationPerfectionistPluginResolvedOptionsCustomProperties
{}
