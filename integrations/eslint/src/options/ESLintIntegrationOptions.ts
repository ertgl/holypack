import type { ExtensionFactoryOptions } from "@holypack/core/extension/factory/ExtensionFactoryOptions";
import type { Optional } from "@holypack/core/lib/object/Optional";

import type { ESLintIntegrationPluginOptionsMapping } from "./ESLintIntegrationPluginOptionsMapping";

export type ESLintIntegrationOptions = (
  & ExtensionFactoryOptions
  & {
    plugins?: Optional<ESLintIntegrationPluginOptionsMapping>;
  }
);
