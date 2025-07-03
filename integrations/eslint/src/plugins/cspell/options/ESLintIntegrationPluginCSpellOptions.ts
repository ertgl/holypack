import type { ExtensionFactoryOptions } from "@holypack/core/extension/factory/ExtensionFactoryOptions";
import type { Optional } from "@holypack/core/lib/object/Optional";
import type { StrictPartial } from "@holypack/core/lib/object/StrictPartial";

import type { CSpellESLintPluginOptions } from "./CSpellESLintPluginOptions";

export type ESLintIntegrationPluginCSpellOptions = (
  & ExtensionFactoryOptions
  & {
    overrides?: Optional<StrictPartial<CSpellESLintPluginOptions>>;
  }
);
