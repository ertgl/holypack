import type { CommandBase } from "./CommandBase";
import type { CommandHandlerSync } from "./handler/CommandHandlerSync";

export type CommandSync = (
  & CommandBase
  & {
    handler: CommandHandlerSync;
  }
);
