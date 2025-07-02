import type { SyncHook } from "tapable";

import type { ConfigSync } from "../../../config/ConfigSync";
import type { ContextSync } from "../../ContextSync";

export type ResolveConfigHookSync = SyncHook<
  [
    context: ContextSync,
    config: ConfigSync,
  ]
>;
