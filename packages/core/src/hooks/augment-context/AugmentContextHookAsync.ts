import type { AsyncParallelHook } from "tapable";

import type { ContextAsync } from "../../context/ContextAsync";

export type AugmentContextHookAsync = AsyncParallelHook<
  [
    context: ContextAsync,
  ]
>;
