import HOLYPACK_CORE_PACKAGE from "@holypack/core/package.json" with { type: "json" };

import type { CLI } from "./CLI";
import { createConfigCommandsGroup } from "./commands/config/createConfigCommandsGroup";
import { createContextCommandsGroup } from "./commands/context/createContextCommandsGroup";
import { Program } from "./program/Program";

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
  const program = new Program();

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

  program.option(
    "--sync",
    "run in synchronous mode",
    false,
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
