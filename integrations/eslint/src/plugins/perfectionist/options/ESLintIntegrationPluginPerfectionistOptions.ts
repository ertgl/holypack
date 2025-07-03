import type { ExtensionFactoryOptions } from "@holypack/core/extension/factory/ExtensionFactoryOptions";
import type { Optional } from "@holypack/core/lib/object/Optional";

import type { ESLintIntegrationPluginPerfectionistOptionInternalPattern } from "./internal-pattern/ESLintIntegrationPluginPerfectionistOptionInternalPattern";

export type ESLintIntegrationPluginPerfectionistOptions = (
  & ExtensionFactoryOptions
  & {
    internalPattern?: Optional<ESLintIntegrationPluginPerfectionistOptionInternalPattern>;
  }
);
