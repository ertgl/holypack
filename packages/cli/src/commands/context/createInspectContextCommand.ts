import { Command } from "commander";

import { resolveContext } from "@holypack/core/context/resolver/resolveContext";
import { sealContext } from "@holypack/core/context/sealer/sealContext";
import { maybeAwait } from "@holypack/core/lib/promise/maybeAwait";
import { suppressErrorMaybeAsync } from "@holypack/core/lib/runtime/suppressErrorMaybeAsync";

import { createCommand } from "../../createCommand";

export function createInspectContextCommand(
  program: Command,
): Command
{
  const command = createCommand();

  command.name("inspect");
  command.description("Output the context object.");
  command.summary("inspect the context");

  command.option(
    "--sync",
    "run in synchronous mode",
    false,
  );

  command.action(
    async () =>
    {
      const programOptions = program.opts();
      const commandOptions = command.opts();

      const configFilePath = programOptions.config as string | undefined;
      const cwd = programOptions.cwd as string | undefined;
      const sync = commandOptions.sync as boolean;

      const context = await maybeAwait(
        resolveContext({
          configFilePathFinderOptions: {
            filePath: configFilePath,
          },
          cwd,
          sync,
        }),
      );

      const prettyFormatter = await suppressErrorMaybeAsync(
        async () => import("pretty-format"),
      );

      const format = (
        value: unknown,
      ): unknown =>
      {
        if (prettyFormatter?.format != null)
        {
          return prettyFormatter.format(
            value,
            {
              highlight: true,
              indent: 2,
            },
          );
        }

        return value;
      };

      await sealContext(
        context,
        () =>
        {
          console.log(format(context));
        },
      );
    },
  );

  return command;
}
