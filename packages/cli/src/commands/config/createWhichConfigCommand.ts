import { Command } from "commander";

import { findConfigFilePathAsync } from "@holypack/core/config/explorer/findConfigFilePathAsync";

import { createCommand } from "../../command/createCommand";

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
      let configFilePath = programOptions.config as string | undefined;

      if (!configFilePath)
      {
        const result = await findConfigFilePathAsync({
          cwd,
        });

        if (result.found)
        {
          configFilePath = result.path;
        }
      }

      if (configFilePath)
      {
        console.log(configFilePath);
      }
      else
      {
        process.exitCode = -1;
      }
    },
  );

  return command;
}
