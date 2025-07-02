import type { AsyncParallelHook } from "tapable";

import type { ContextAsync } from "../../context/ContextAsync";
import type { Extension } from "../../extension/Extension";

export type PostBindExtensionHookAsync = AsyncParallelHook<
  [
    context: ContextAsync,
    extension: Extension,
  ]
>;
