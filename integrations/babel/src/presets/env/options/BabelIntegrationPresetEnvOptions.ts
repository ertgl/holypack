import type { Options as BabelPresetEnvOptions } from "@babel/preset-env";

import type { ExtensionFactoryOptions } from "@holypack/core/extension/factory/ExtensionFactoryOptions";
import type { Optional } from "@holypack/core/lib/object/Optional";

export type BabelIntegrationPresetEnvOptions = (
  & ExtensionFactoryOptions
  & {
    overrides?: Optional<BabelPresetEnvOptions>;
  }
);
