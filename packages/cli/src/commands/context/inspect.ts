import { Command } from "commander";

import { resolveContext } from "@holypack/core";

import { createCommand } from "../../command";

export function createInspectContextCommand(
  program: Command,
): Command
{
  const command = createCommand();

  command.name("inspect");
  command.description("Output the context object.");
  command.summary("inspect the context");

  command.action(
    async () =>
    {
      const programOptions = program.opts();

      const cwd = programOptions.cwd as string | undefined;
      const configFilePath = programOptions.config as string | undefined;

      const { format } = await import("pretty-format");

      const context = await resolveContext({
        configFilePath,
        cwd,
      });

      console.log(
        format(
          context,
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
