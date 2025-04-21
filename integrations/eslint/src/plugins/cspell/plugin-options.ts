import type { CSpellESLintPluginOptions } from "./config";

export type ESLintIntegrationCSpellPluginOptions = (
  & ESLintIntegrationCSpellPluginOptionsBaseProperties
  & ESLintIntegrationCSpellPluginOptionsCustomProperties
);

export type ESLintIntegrationCSpellPluginOptionsBaseProperties = {
  overrides?: Partial<CSpellESLintPluginOptions>;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ESLintIntegrationCSpellPluginOptionsCustomProperties
{}

export type ESLintIntegrationCSpellPluginResolvedOptions = (
  & ESLintIntegrationCSpellPluginResolvedOptionsBaseProperties
  & ESLintIntegrationCSpellPluginResolvedOptionsCustomProperties
);

export type ESLintIntegrationCSpellPluginResolvedOptionsBaseProperties = {
  overrides: CSpellESLintPluginOptions;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ESLintIntegrationCSpellPluginResolvedOptionsCustomProperties
{}
