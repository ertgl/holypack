import { Command } from "commander";

import { createInspectContextCommand } from "./context/inspect";

export function createContextCommandsGroup(): Command
{
  const command = new Command();

  command.name("context");
  command.description("context commands");

  command.addCommand(
    createInspectContextCommand(),
  );

  return command;
}
