import type { Config } from "jest";

export type JestIntegrationConfigPluginOptions = (
  & JestIntegrationConfigPluginOptionsBaseProperties
  & JestIntegrationConfigPluginOptionsCustomProperties
);

export type JestIntegrationConfigPluginOptionsBaseProperties = {
  overrides?: Config | null;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface JestIntegrationConfigPluginOptionsCustomProperties
{}

export type JestIntegrationConfigPluginResolvedOptions = (
  & JestIntegrationConfigPluginResolvedOptionsBaseProperties
  & JestIntegrationConfigPluginResolvedOptionsCustomProperties
);

export type JestIntegrationConfigPluginResolvedOptionsBaseProperties = {
  overrides: Config;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface JestIntegrationConfigPluginResolvedOptionsCustomProperties
{}
