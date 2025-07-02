import type { Optional } from "@holypack/core/lib/object/Optional";

import type { BabelIntegrationPluginImportSourceTransformerOptions } from "../options/BabelIntegrationPluginImportSourceTransformerOptions";

import { BabelIntegrationPluginImportSourceTransformer } from "./BabelIntegrationPluginImportSourceTransformer";

export function createBabelIntegrationPluginImportSourceTransformer(
  options?: Optional<BabelIntegrationPluginImportSourceTransformerOptions>,
): BabelIntegrationPluginImportSourceTransformer
{
  return new BabelIntegrationPluginImportSourceTransformer(options);
}
