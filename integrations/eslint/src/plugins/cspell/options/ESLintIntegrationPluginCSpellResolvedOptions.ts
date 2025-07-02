import type { StrictPartial } from "@holypack/core/lib/object/StrictPartial";

import type { CSpellESLintPluginOptions } from "./CSpellESLintPluginOptions";

export type ESLintIntegrationPluginCSpellResolvedOptions = {
  overrides: StrictPartial<CSpellESLintPluginOptions>;
};
