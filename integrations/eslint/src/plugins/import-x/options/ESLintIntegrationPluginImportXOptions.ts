import type { ExtensionFactoryOptions } from "@holypack/core/extension/factory/ExtensionFactoryOptions";
import type { Optional } from "@holypack/core/lib/object/Optional";

import type { ESLintIntegrationPluginImportXOptionInternalRegex } from "./internal-regex/ESLintIntegrationPluginImportXOptionInternalRegex";

export type ESLintIntegrationPluginImportXOptions = (
  & ExtensionFactoryOptions
  & {
    internalRegex?: Optional<ESLintIntegrationPluginImportXOptionInternalRegex>;
  }
);
