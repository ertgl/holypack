import { getCWD } from "./cwd";

export function resolveCWD(
  cwd?: null | string,
): string
{
  if (!cwd)
  {
    return getCWD();
  }
  return cwd;
}
