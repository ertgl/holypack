import type { ExecutionModeTraitStrictAsync } from "../../lib/runtime/ExecutionModeTraitStrictAsync";

import type { ContextResolutionOptionsBaseAsync } from "./ContextResolutionOptionsBaseAsync";

export type ContextResolutionOptionsStrictAsync = (
  & ContextResolutionOptionsBaseAsync
  & ExecutionModeTraitStrictAsync
);
