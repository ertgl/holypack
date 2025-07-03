import type { MaybePromise } from "../../lib/promise/MaybePromise";
import type { AnyHookAsync } from "../AnyHookAsync";

export type UseHookCallbackMaybeAsync<
  T_Hook extends AnyHookAsync = AnyHookAsync,
> = (
  hook: T_Hook,
) => MaybePromise<unknown>;
