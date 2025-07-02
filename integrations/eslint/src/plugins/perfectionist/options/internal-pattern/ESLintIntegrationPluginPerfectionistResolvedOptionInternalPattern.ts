import type { Optional } from "@holypack/core/lib/object/Optional";

export type ESLintIntegrationPluginPerfectionistResolvedOptionInternalPattern = {
  extra: (RegExp | string)[];
  overrides: Optional<(RegExp | string)[]>;
};
