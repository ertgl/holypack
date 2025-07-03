import type { SyncHook } from "tapable";

import type { ContextSync } from "../../../../../context/ContextSync";

export type EmitWarningHookSync = SyncHook<
  [
    context: ContextSync,
    err: Error,
  ]
>;
