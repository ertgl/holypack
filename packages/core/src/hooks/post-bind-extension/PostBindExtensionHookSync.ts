import type { SyncHook } from "tapable";

import type { ContextSync } from "../../context/ContextSync";
import type { Extension } from "../../extension/Extension";

export type PostBindExtensionHookSync = SyncHook<
  [
    context: ContextSync,
    extension: Extension,
  ]
>;
