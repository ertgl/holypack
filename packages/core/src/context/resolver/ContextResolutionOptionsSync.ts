import type { ExecutionModeTraitOptionalSync } from "../../lib/runtime/ExecutionModeTraitOptionalSync";

import type { ContextResolutionOptionsBaseSync } from "./ContextResolutionOptionsBaseSync";

export type ContextResolutionOptionsSync = (
  & ContextResolutionOptionsBaseSync
  & ExecutionModeTraitOptionalSync
);
