import type { Options as BabelPluginImportSourceTransformerOptions } from "babel-plugin-transform-import-source";

import type { ExtensionFactoryOptions } from "@holypack/core/extension/factory/ExtensionFactoryOptions";
import type { Optional } from "@holypack/core/lib/object/Optional";

export type BabelIntegrationPluginImportSourceTransformerOptions = (
  & ExtensionFactoryOptions
  & {
    overrides?: Optional<BabelPluginImportSourceTransformerOptions>;
  }
);
