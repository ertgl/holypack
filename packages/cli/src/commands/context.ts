import { Command } from "commander";

import { createCommand } from "../command";

import { createInspectContextCommand } from "./context/inspect";

export function createContextCommandsGroup(
  program: Command,
): Command
{
  const command = createCommand();

  command.name("context");
  command.description("Work with the context.");
  command.summary("context commands");

  command.addCommand(
    createInspectContextCommand(
      program,
    ),
  );

  return command;
}
