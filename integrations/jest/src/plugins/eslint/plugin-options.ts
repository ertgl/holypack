export type JestIntegrationESLintPluginOptions = (
  & JestIntegrationESLintPluginOptionsBaseProperties
  & JestIntegrationESLintPluginOptionsCustomProperties
);

export type JestIntegrationESLintPluginOptionsBaseProperties = {
  roots?: null | string[];
  testMatch?: null | string[];
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface JestIntegrationESLintPluginOptionsCustomProperties
{}

export type JestIntegrationESLintPluginResolvedOptions = (
  & JestIntegrationESLintPluginResolvedOptionsBaseProperties
  & JestIntegrationESLintPluginResolvedOptionsCustomProperties
);

export type JestIntegrationESLintPluginResolvedOptionsBaseProperties = {
  roots: string[];
  testMatch: string[];
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface JestIntegrationESLintPluginResolvedOptionsCustomProperties
{}

export const JEST_INTEGRATION_ESLINT_PLUGIN_DEFAULT_TEST_MATCH = [
  "**/*.{spec,test}.{cjs,js,mjs}",
  "**/*.{spec,test}.{cjs,js,mjs}x",
  "**/*.{spec,test}.{cts,mts,ts}",
  "**/*.{spec,test}.{cts,mts,ts}x",
  "**/{spec,test}.{cjs,js,mjs}",
  "**/{spec,test}.{cjs,js,mjs}x",
  "**/{spec,test}.{cts,mts,ts}",
  "**/{spec,test}.{cts,mts,ts}x",
];

export const JEST_INTEGRATION_ESLINT_PLUGIN_DEFAULT_ROOTS = [
  "test",
];
