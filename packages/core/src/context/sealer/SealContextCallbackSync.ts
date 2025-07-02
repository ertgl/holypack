import type { ContextSync } from "../ContextSync";

export type SealContextCallbackSync<
  T_Context extends ContextSync = ContextSync,
> = (
  context: T_Context,
) => unknown;
