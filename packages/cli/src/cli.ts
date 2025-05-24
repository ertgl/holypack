import { Command } from "commander";

import HOLYPACK_CORE_PACKAGE from "@holypack/core/package.json" with { type: "json" };

import { createCommand } from "./command";
import { createConfigCommandsGroup } from "./commands/config";
import { createContextCommandsGroup } from "./commands/context";

export type CLI = {
  program: Command;
};

const DESCRIPTION = `
Work with holypack from the command line.

Holypack
Backend-agnostic build system for scalable web projects.
https://github.com/ertgl/holypack

Copyright (c) 2025 Ertuğrul Keremoğlu <ertugkeremoglu@gmail.com>
Licensed under the MIT License.
https://github.com/ertgl/holypack/blob/main/LICENSE
`.trim();

export function createCLI(): CLI
{
  const program = createCommand();

  program.name("holypack");
  program.description(DESCRIPTION);
  program.summary("holypack commands");

  program.version(
    HOLYPACK_CORE_PACKAGE.version,
    "-v, --version",
    "output the version number",
  );

  program.option(
    "-c, --config <path>",
    "path to the configuration file",
  );

  program.option(
    "--cwd <path>",
    "path to the current working directory",
  );

  program.addCommand(
    createConfigCommandsGroup(
      program,
    ),
  );

  program.addCommand(
    createContextCommandsGroup(
      program,
    ),
  );

  return {
    program,
  };
}

export async function runCLI(
  cli?: CLI | null,
  argv?: null | readonly string[],
): Promise<void>
{
  cli ??= createCLI();
  argv ??= process.argv;

  process.title = cli.program.name();

  await cli.program.parseAsync(argv);
}
