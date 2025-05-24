import { Command } from "commander";

import { resolveContext } from "@holypack/core";

export function createInspectContextCommand(): Command
{
  const command = new Command();

  command.name("inspect");
  command.description("inspect the context");

  command.action(
    async () =>
    {
      const { format } = await import("pretty-format");

      const context = await resolveContext();

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
