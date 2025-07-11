import { Command } from "commander";

import { configureCommandHelp } from "./configureCommandHelp";

export function createCommand(): Command
{
  const command = new Command();

  configureCommandHelp(command);

  return command;
}
