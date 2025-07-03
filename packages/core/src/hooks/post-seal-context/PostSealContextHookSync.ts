import type { SyncHook } from "tapable";

import type { ContextSync } from "../../context/ContextSync";

export type PostSealContextHookSync = SyncHook<
  [
    context: ContextSync,
  ]
>;
