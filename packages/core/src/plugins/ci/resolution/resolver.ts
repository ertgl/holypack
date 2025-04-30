import { castBoolean } from "../../../lib/process/std";

export function resolveCI(
  ci?: boolean | null,
): boolean
{
  return ci ?? castBoolean(process.env.CI);
}
