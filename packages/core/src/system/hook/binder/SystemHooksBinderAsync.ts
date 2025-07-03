import type { ContextAsync } from "../../../context/ContextAsync";

export type SystemHooksBinderAsync = (
  context: ContextAsync,
) => Promise<unknown>;
