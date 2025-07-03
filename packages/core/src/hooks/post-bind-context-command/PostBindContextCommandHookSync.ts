import type { SyncHook } from "tapable";

import type { CommandSync } from "../../command/CommandSync";
import type { ContextSync } from "../../context/ContextSync";

export type PostBindContextCommandHookSync = SyncHook<
  [
    context: ContextSync,
    command: CommandSync,
  ]
>;
