import type { BabelPresetEnvOptions } from "./config";

export type BabelIntegrationEnvPluginOptions = (
  & BabelIntegrationEnvPluginOptionsBaseProperties
  & BabelIntegrationEnvPluginOptionsCustomProperties
);

export type BabelIntegrationEnvPluginOptionsBaseProperties = {
  overrides?: Partial<BabelPresetEnvOptions>;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BabelIntegrationEnvPluginOptionsCustomProperties
{}

export type BabelIntegrationEnvPluginResolvedOptions = (
  & BabelIntegrationEnvPluginResolvedOptionsBaseProperties
  & BabelIntegrationEnvPluginResolvedOptionsCustomProperties
);

export type BabelIntegrationEnvPluginResolvedOptionsBaseProperties = {
  modules: "commonjs" | false;
  overrides: BabelPresetEnvOptions;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BabelIntegrationEnvPluginResolvedOptionsCustomProperties
{}
