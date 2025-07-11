import { Command } from "commander";

import { createCommand } from "../../command/createCommand";

import { createInspectConfigCommand } from "./createInspectConfigCommand";
import { createWhichConfigCommand } from "./createWhichConfigCommand";

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
