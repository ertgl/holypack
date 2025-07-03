import type { CommandSync } from "../CommandSync";

export type UseCommandCallbackSync<
  T_Command extends CommandSync = CommandSync,
> = (
  command: T_Command,
) => unknown;
