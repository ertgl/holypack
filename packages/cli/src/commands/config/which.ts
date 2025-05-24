import { Command } from "commander";

export function createWhichConfigCommand(): Command
{
  const command = new Command();

  command.name("which");
  command.description("show the path to the config file");

  return command;
}
