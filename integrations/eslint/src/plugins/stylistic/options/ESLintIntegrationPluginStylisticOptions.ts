import type { StylisticCustomizeOptions } from "@stylistic/eslint-plugin";

import type { ExtensionFactoryOptions } from "@holypack/core/extension/factory/ExtensionFactoryOptions";
import type { Optional } from "@holypack/core/lib/object/Optional";

export type ESLintIntegrationPluginStylisticOptions = (
  & ExtensionFactoryOptions
  & {
    overrides?: Optional<StylisticCustomizeOptions>;
  }
);
