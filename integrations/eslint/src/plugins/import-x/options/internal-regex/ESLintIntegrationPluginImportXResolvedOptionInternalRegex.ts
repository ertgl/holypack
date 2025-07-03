import type { Optional } from "@holypack/core/lib/object/Optional";

export type ESLintIntegrationPluginImportXResolvedOptionInternalRegex = {
  extra: (RegExp | string)[];
  overrides: Optional<(RegExp | string)[]>;
};
