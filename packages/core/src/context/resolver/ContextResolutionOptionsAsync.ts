import type { ExecutionModeTraitOptionalAsync } from "../../lib/runtime/ExecutionModeTraitOptionalAsync";

import type { ContextResolutionOptionsBaseAsync } from "./ContextResolutionOptionsBaseAsync";

export type ContextResolutionOptionsAsync = (
  & ContextResolutionOptionsBaseAsync
  & ExecutionModeTraitOptionalAsync
);
