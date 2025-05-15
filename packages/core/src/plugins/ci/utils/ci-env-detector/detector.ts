import { castBoolean } from "../../../../lib/process/std";

export function isCI(): boolean
{
  return castBoolean(process.env.CI);
}
