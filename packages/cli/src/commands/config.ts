import { Command } from "commander";

import { createCommand } from "../command";

import { createInspectConfigCommand } from "./config/inspect";
import { createWhichConfigCommand } from "./config/which";

export function createConfigCommandsGroup(
  program: Command,
): Command
{
  const command = createCommand();

  command.name("config");
  command.description("Work with the config file.");
  command.summary("config commands");

  command.addCommand(
    createInspectConfigCommand(
      program,
    ),
  );

  command.addCommand(
    createWhichConfigCommand(
      program,
    ),
  );

  return command;
}
