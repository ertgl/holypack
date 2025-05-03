import type { Options as BabelPresetEnvOptions } from "@babel/preset-env";

export type BabelIntegrationEnvPluginOptions = {
  overrides?: BabelPresetEnvOptions | null;
};
