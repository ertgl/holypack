import type { Linter } from "eslint";
import type { SyncHook } from "tapable";

import type { ESLintContext } from "../../context/ESLintContext";
import type { ESLintIntegrationResolvedOptions } from "../../options/ESLintIntegrationResolvedOptions";

export type GenerateLinterConfigArrayHookSync = SyncHook<
  [
    eslintContext: ESLintContext,
    eslintIntegrationOptions: ESLintIntegrationResolvedOptions,
    linterConfigArray: Linter.Config[],
  ]
>;
