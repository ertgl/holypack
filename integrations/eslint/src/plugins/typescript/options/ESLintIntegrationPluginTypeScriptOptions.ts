import type { ExtensionFactoryOptions } from "@holypack/core/extension/factory/ExtensionFactoryOptions";
import type { Optional } from "@holypack/core/lib/object/Optional";

export type ESLintIntegrationPluginTypeScriptOptions = (
  & ExtensionFactoryOptions
  & {
    warnOnUnsupportedTypeScriptVersion?: Optional<boolean>;
  }
);
