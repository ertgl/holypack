import type { AsyncParallelHook } from "tapable";

import type { ContextAsync } from "../../context/ContextAsync";
import type { AnyHook } from "../../hook/AnyHook";

export type PostBindContextHookHookAsync = AsyncParallelHook<
  [
    context: ContextAsync,
    hook: AnyHook,
  ]
>;
