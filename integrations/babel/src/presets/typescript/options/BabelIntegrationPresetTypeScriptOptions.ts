import type { ExtensionFactoryOptions } from "@holypack/core/extension/factory/ExtensionFactoryOptions";
import type { Optional } from "@holypack/core/lib/object/Optional";

import type { BabelPresetTypeScriptOptions } from "./BabelPresetTypeScriptOptions";

export type BabelIntegrationPresetTypeScriptOptions = (
  & ExtensionFactoryOptions
  & {
    overrides?: Optional<BabelPresetTypeScriptOptions>;
  }
);
