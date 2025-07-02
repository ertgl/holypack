import type { SyncHook } from "tapable";

import type { ContextSync } from "../../context/ContextSync";

export type AugmentContextHookSync = SyncHook<
  [
    context: ContextSync,
  ]
>;
