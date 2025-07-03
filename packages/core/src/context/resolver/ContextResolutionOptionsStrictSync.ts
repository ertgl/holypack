import type { ExecutionModeTraitStrictSync } from "../../lib/runtime/ExecutionModeTraitStrictSync";

import type { ContextResolutionOptionsBaseSync } from "./ContextResolutionOptionsBaseSync";

export type ContextResolutionOptionsStrictSync = (
  & ContextResolutionOptionsBaseSync
  & ExecutionModeTraitStrictSync
);
