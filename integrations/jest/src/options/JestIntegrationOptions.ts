import type { Config } from "jest";

import type { ExtensionFactoryOptions } from "@holypack/core/extension/factory/ExtensionFactoryOptions";
import type { Optional } from "@holypack/core/lib/object/Optional";

import type { JestIntegrationPluginOptionsMapping } from "./JestIntegrationPluginOptionsMapping";

export type JestIntegrationOptions = (
  & ExtensionFactoryOptions
  & {
    overrides?: Optional<Config>;
    plugins?: Optional<JestIntegrationPluginOptionsMapping>;
  }
);
