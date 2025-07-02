import type { ExecutionModeTrait } from "../../lib/runtime/ExecutionModeTrait";

import type { ContextResolutionOptionsBaseAsync } from "./ContextResolutionOptionsBaseAsync";
import type { ContextResolutionOptionsBaseSync } from "./ContextResolutionOptionsBaseSync";

export type ContextResolutionOptionsAsyncOrSync = (
  & ExecutionModeTrait
  & (
    | ContextResolutionOptionsBaseAsync
    | ContextResolutionOptionsBaseSync
  )
);
