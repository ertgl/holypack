import type { AsyncParallelHook } from "tapable";

import type { CommandAsync } from "../../command/CommandAsync";
import type { ContextAsync } from "../../context/ContextAsync";

export type PostBindContextCommandHookAsync = AsyncParallelHook<
  [
    context: ContextAsync,
    command: CommandAsync,
  ]
>;
