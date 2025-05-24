import { Command } from "commander";

import { loadConfig } from "@holypack/core/config/loader";

import { createCommand } from "../../command";

export function createInspectConfigCommand(
  program: Command,
): Command
{
  const command = createCommand();

  command.name("inspect");
  command.description("Output the config object.");
  command.summary("inspect the config");
  command.action(
    async () =>
    {
      const programOptions = program.opts();

      const cwd = programOptions.cwd as string | undefined;
      const configFilePath = programOptions.config as string | undefined;

      const { format } = await import("pretty-format");

      const config = await loadConfig({
        configFilePath,
        cwd,
      });

      console.log(
        format(
          config,
          {
            highlight: true,
            indent: 2,
          },
        ),
      );
    },
  );

  return command;
}
