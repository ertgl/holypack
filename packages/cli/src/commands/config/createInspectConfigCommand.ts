import { Command } from "commander";

import { findConfigFilePathAsync } from "@holypack/core/config/explorer/findConfigFilePathAsync";
import { loadConfigDefinitionAsync } from "@holypack/core/config/loader/loadConfigDefinitionAsync";
import { suppressErrorMaybeAsync } from "@holypack/core/lib/runtime/suppressErrorMaybeAsync";

import { createCommand } from "../../command/createCommand";

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

      const config = await loadConfigDefinitionAsync(
        configFilePath,
        {
          cwd,
        },
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

      console.log(format(config));
    },
  );

  return command;
}
