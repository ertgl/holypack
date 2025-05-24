import { Command } from "commander";

export function createInspectConfigCommand(): Command
{
  const command = new Command();

  command.name("inspect");
  command.description("inspect the config");

  return command;
}
