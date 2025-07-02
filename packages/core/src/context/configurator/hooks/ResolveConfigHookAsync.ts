import type { AsyncParallelHook } from "tapable";

import type { ConfigAsync } from "../../../config/ConfigAsync";
import type { ContextAsync } from "../../ContextAsync";

export type ResolveConfigHookAsync = AsyncParallelHook<
  [
    context: ContextAsync,
    config: ConfigAsync,
  ]
>;
