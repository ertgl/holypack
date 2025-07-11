import type { SyncHook } from "tapable";

import type { ContextSync } from "@holypack/core/context/ContextSync";

import type { Program } from "../../program/Program";

export type SetupCLIHookSync = SyncHook<
  [
    context: ContextSync,
    program: Program,
  ]
>;
