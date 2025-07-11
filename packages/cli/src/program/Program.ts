import {
  Command, type ParseOptions,
} from "commander";

import { resolveContextAsync } from "@holypack/core/context/resolver/resolveContextAsync";
import { sealContext } from "@holypack/core/context/sealer/sealContext";

import { configureCommandHelp } from "../command/configureCommandHelp";
import { createCLIExtension } from "../extension/createCLIExtension";

export class Program extends Command
{
  createCommand(
    name?: string,
  ): Command
  {
    const command = super.createCommand(name);
    configureCommandHelp(command);
    return command;
  }

  async parseAsync(
    argv?: readonly string[],
    parseOptions?: ParseOptions,
  ): Promise<this>
  {
    const cliExtension = createCLIExtension(this);

    const context = await resolveContextAsync({
      postConfig: [
        {
          extensions: [
            cliExtension,
          ],
        },
      ],
    });

    await sealContext(
      context,
      async () =>
      {
        await cliExtension.setup(context);
      },
    );

    return super.parseAsync(
      argv,
      parseOptions,
    );
  }
}
