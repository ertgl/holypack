import type { SyncHook } from "tapable";

import type { ContextSync } from "../../context/ContextSync";
import type { Extension } from "../../extension/Extension";
import type { AnyHookSync } from "../../hook/AnyHookSync";

export type PostBindExtensionHookHookSync = SyncHook<
  [
    context: ContextSync,
    extension: Extension,
    hook: AnyHookSync,
  ]
>;
