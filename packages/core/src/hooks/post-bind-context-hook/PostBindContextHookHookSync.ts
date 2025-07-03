import type { SyncHook } from "tapable";

import type { ContextSync } from "../../context/ContextSync";
import type { AnyHookSync } from "../../hook/AnyHookSync";

export type PostBindContextHookHookSync = SyncHook<
  [
    context: ContextSync,
    hook: AnyHookSync,
  ]
>;
