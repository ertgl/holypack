import type { Optional } from "@holypack/core/lib/object/Optional";

export type ESLintIntegrationPluginGlobalIgnoresResolvedOptions = {
  extra: string[];
  overrides: Optional<string[]>;
};
