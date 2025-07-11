import type { Command } from "commander";

import type { Program } from "@holypack/cli/program/Program";
import type { Context } from "@holypack/core/context/Context";

export function createCLICommandBabel(
  context: Context,
  program: Program,
): Command
{
  const command = program.createCommand();

  command.name("babel");
  command.description("Work with the Babel integration.");
  command.summary("babel commands");

  return command;
}
