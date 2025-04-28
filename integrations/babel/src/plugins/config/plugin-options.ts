import type { TransformOptions } from "@babel/core";

export type BabelIntegrationConfigPluginOptions = (
  & BabelIntegrationConfigPluginOptionsBaseProperties
  & BabelIntegrationConfigPluginOptionsCustomProperties
);

export type BabelIntegrationConfigPluginOptionsBaseProperties = {
  overrides?: null | TransformOptions;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BabelIntegrationConfigPluginOptionsCustomProperties
{}

export type BabelIntegrationConfigPluginResolvedOptions = (
  & BabelIntegrationConfigPluginResolvedOptionsBaseProperties
  & BabelIntegrationConfigPluginResolvedOptionsCustomProperties
);

export type BabelIntegrationConfigPluginResolvedOptionsBaseProperties = {
  overrides: TransformOptions;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BabelIntegrationConfigPluginResolvedOptionsCustomProperties
{}
