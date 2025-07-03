import type { CommandAsync } from "../CommandAsync";

export type UseCommandCallbackAsync<
  T_Command extends CommandAsync = CommandAsync,
> = (
  command: T_Command,
) => Promise<unknown>;
