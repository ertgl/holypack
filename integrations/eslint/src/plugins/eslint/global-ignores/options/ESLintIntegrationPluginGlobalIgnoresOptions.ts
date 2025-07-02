import type { ExtensionFactoryOptions } from "@holypack/core/extension/factory/ExtensionFactoryOptions";
import type { Optional } from "@holypack/core/lib/object/Optional";

export type ESLintIntegrationPluginGlobalIgnoresOptions = (
  & ExtensionFactoryOptions
  & {
    extra?: Optional<string[]>;
    overrides?: Optional<string[]>;
  }
);
