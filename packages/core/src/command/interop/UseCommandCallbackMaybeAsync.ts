import type { MaybePromise } from "../../lib/promise/MaybePromise";
import type { CommandAsync } from "../CommandAsync";

export type UseCommandCallbackMaybeAsync<
  T_Command extends CommandAsync = CommandAsync,
> = (
  command: T_Command,
) => MaybePromise<unknown>;
