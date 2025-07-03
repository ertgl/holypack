import type { AsyncParallelHook } from "tapable";

import type { ContextAsync } from "../../../../../context/ContextAsync";

export type EmitWarningHookAsync = AsyncParallelHook<
  [
    context: ContextAsync,
    err: Error,
  ]
>;
