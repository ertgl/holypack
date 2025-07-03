import type { SyncHook } from "tapable";

import type { ContextSync } from "../../context/ContextSync";

export type ResolveContextHookSync = SyncHook<
  [
    context: ContextSync,
  ]
>;
