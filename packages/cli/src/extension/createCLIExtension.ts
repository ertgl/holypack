import type { Program } from "../program/Program";

import { CLIExtension } from "./CLIExtension";

export function createCLIExtension(
  program: Program,
): CLIExtension
{
  return new CLIExtension(program);
}
