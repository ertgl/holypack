import type { Optional } from "@holypack/core/lib/object/Optional";

export type ESLintIntegrationPluginPerfectionistOptionInternalPattern = {
  extra?: Optional<(RegExp | string)[]>;
  overrides?: Optional<(RegExp | string)[]>;
};
