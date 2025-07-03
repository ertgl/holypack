import type { ContextResolutionOptionsAsync } from "./ContextResolutionOptionsAsync";
import type { ContextResolutionOptionsStrictAsync } from "./ContextResolutionOptionsStrictAsync";
import type { ContextResolutionOptionsStrictSync } from "./ContextResolutionOptionsStrictSync";

export type ContextResolutionOptions = (
  | ContextResolutionOptionsAsync
  | ContextResolutionOptionsStrictAsync
  | ContextResolutionOptionsStrictSync
);
