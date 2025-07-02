import type { AsyncParallelHook } from "tapable";

import type { ContextAsync } from "../../context/ContextAsync";
import type { Extension } from "../../extension/Extension";
import type { AnyHook } from "../../hook/AnyHook";

export type PostBindExtensionHookHookAsync = AsyncParallelHook<
  [
    context: ContextAsync,
    extension: Extension,
    hook: AnyHook,
  ]
>;
