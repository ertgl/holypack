import type { SyncHook } from "tapable";

import type { ContextSync } from "../../context/ContextSync";

export type SetupHookSync = SyncHook<
  [
    context: ContextSync,
  ]
>;
