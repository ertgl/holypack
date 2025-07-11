import type { AsyncParallelHook } from "tapable";

import type { ContextAsync } from "@holypack/core/context/ContextAsync";

import type { Program } from "../../program/Program";

export type SetupCLIHookAsync = AsyncParallelHook<
  [
    context: ContextAsync,
    program: Program,
  ]
>;
