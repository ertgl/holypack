import type { Path } from "../../path/Path";

export function getCWD(): Path
{
  return process.cwd();
}
