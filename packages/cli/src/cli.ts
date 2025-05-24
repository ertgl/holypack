import { Command } from "commander";

import { createContextCommandsGroup } from "./commands/context";

export type CLI = {
  rootCommand: Command;
};

export function createCLI(): CLI
{
  const rootCommand = new Command();

  rootCommand.name("holypack");
  rootCommand.description("Command line interface for holypack");
  rootCommand.option(
    "-c, --config <path>",
    "Path to the configuration file",
    "",
  );

  rootCommand.addCommand(
    createContextCommandsGroup(),
  );

  return {
    rootCommand,
  };
}

export async function runCLI(
  cli?: CLI | null,
  argv?: null | readonly string[],
): Promise<void>
{
  cli ??= createCLI();
  argv ??= process.argv;

  process.title = cli.rootCommand.name();

  await cli.rootCommand.parseAsync(argv);
}
