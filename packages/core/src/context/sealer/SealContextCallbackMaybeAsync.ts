import type { MaybePromise } from "../../lib/promise/MaybePromise";
import type { ContextAsync } from "../ContextAsync";

export type SealContextCallbackMaybeAsync<
  T_Context extends ContextAsync = ContextAsync,
> = (
  context: T_Context,
) => MaybePromise<unknown>;
