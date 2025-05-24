import { Command } from "commander";

import { createInspectConfigCommand } from "./config/inspect";
import { createWhichConfigCommand } from "./config/which";

export function createConfigCommandsGroup(): Command
{
  const command = new Command();

  command.name("config");
  command.description("config commands");

  command.addCommand(
    createInspectConfigCommand(),
  );

  command.addCommand(
    createWhichConfigCommand(),
  );

  return command;
}
