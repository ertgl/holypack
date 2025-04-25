import type { BabelPresetTypeScriptOptions } from "./config";

export type BabelIntegrationTypeScriptPluginOptions = (
  & BabelIntegrationTypeScriptPluginOptionsBaseProperties
  & BabelIntegrationTypeScriptPluginOptionsCustomProperties
);

export type BabelIntegrationTypeScriptPluginOptionsBaseProperties = {
  overrides?: Partial<BabelPresetTypeScriptOptions>;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BabelIntegrationTypeScriptPluginOptionsCustomProperties
{}

export type BabelIntegrationTypeScriptPluginResolvedOptions = (
  & BabelIntegrationTypeScriptPluginResolvedOptionsBaseProperties
  & BabelIntegrationTypeScriptPluginResolvedOptionsCustomProperties
);

export type BabelIntegrationTypeScriptPluginResolvedOptionsBaseProperties = {
  overrides: Partial<BabelPresetTypeScriptOptions>;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BabelIntegrationTypeScriptPluginResolvedOptionsCustomProperties
{}
