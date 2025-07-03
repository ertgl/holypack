import type { CommandBase } from "./CommandBase";
import type { CommandHandlerMaybeAsync } from "./handler/CommandHandlerMaybeAsync";

export type CommandAsync = (
  & CommandBase
  & {
    handler: CommandHandlerMaybeAsync;
  }
);
