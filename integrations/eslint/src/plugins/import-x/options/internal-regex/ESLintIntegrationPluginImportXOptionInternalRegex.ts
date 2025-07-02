import type { Optional } from "@holypack/core/lib/object/Optional";

export type ESLintIntegrationPluginImportXOptionInternalRegex = {
  extra?: Optional<(RegExp | string)[]>;
  overrides?: Optional<(RegExp | string)[]>;
};
