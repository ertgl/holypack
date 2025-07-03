import type { TransformOptions } from "@babel/core";

import type { ExtensionFactoryOptions } from "@holypack/core/extension/factory/ExtensionFactoryOptions";
import type { Optional } from "@holypack/core/lib/object/Optional";

import { ModuleFormat } from "../compilation/ModuleFormat";

export type BabelIntegrationOptions = (
  & ExtensionFactoryOptions
  & {
    format?: Optional<ModuleFormat>;
    overrides?: Optional<TransformOptions>;
  }
);
