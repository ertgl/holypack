import { Command } from "commander";

import { searchConfig } from "@holypack/core/config/explorer";

import { createCommand } from "../../command";

export function createWhichConfigCommand(
  program: Command,
): Command
{
  const command = createCommand();

  command.name("which");
  command.description("Output the path to the config file.");
  command.summary("output the path to the config file");

  command.action(
    async () =>
    {
      const programOptions = program.opts();

      const cwd = programOptions.cwd as string | undefined;
      const configFilePath = programOptions.config as string | undefined;

      const result = await searchConfig(
        cwd,
        {
          searchPlaces: (
            configFilePath
              ? [configFilePath]
              : undefined
          ),
        },
      );

      if (result.found)
      {
        console.log(result.filePath);
      }
    },
  );

  return command;
}
