import type { ContextAsync } from "../ContextAsync";

export type SealContextCallbackAsync<
  T_Context extends ContextAsync = ContextAsync,
> = (
  context: T_Context,
) => Promise<unknown>;
