import type { Command } from "../Command";

export type ExtractCommandData<
  T_Command extends Command,
> = Parameters<T_Command["handler"]>[0]["data"];
