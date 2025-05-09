import type {
  Options as ImportSourceTransformerPluginOptions,
} from "babel-plugin-transform-import-source";

export type BabelIntegrationImportSourcePluginOptions = {
  overrides?: ImportSourceTransformerPluginOptions | null;
  targetExtension?: null | string;
};
