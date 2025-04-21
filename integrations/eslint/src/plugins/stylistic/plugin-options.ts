import type { StylisticESLintPluginOptions } from "./config";

export type ESLintIntegrationStylisticPluginOptions = (
  & ESLintIntegrationStylisticPluginOptionsBaseProperties
  & ESLintIntegrationStylisticPluginOptionsCustomProperties
);

export type ESLintIntegrationStylisticPluginOptionsBaseProperties = {
  overrides?: Partial<StylisticESLintPluginOptions>;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ESLintIntegrationStylisticPluginOptionsCustomProperties
{}

export type ESLintIntegrationStylisticPluginResolvedOptions = (
  & ESLintIntegrationStylisticPluginResolvedOptionsBaseProperties
  & ESLintIntegrationStylisticPluginResolvedOptionsCustomProperties
);

export type ESLintIntegrationStylisticPluginResolvedOptionsBaseProperties = {
  overrides: StylisticESLintPluginOptions;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ESLintIntegrationStylisticPluginResolvedOptionsCustomProperties
{}
