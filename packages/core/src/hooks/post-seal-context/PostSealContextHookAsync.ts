import type { AsyncParallelHook } from "tapable";

import type { ContextAsync } from "../../context/ContextAsync";

export type PostSealContextHookAsync = AsyncParallelHook<
  [
    context: ContextAsync,
  ]
>;
