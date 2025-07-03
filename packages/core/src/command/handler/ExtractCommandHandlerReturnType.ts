import type { Command } from "../Command";
import type { CommandAsync } from "../CommandAsync";

export type ExtractCommandHandlerReturnType<
  T_Command extends Command,
> = (
  ReturnType<T_Command["handler"]> extends infer R
    ? (
        T_Command extends CommandAsync
          ? Awaited<R>
          : R
      )
    : never
);
