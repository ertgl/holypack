import type { Compactible } from "./Compactible";

export function compactArray<T>(
  compactible: Compactible<T>,
): T[]
{
  if (compactible == null)
  {
    return [];
  }

  return compactible.filter(Boolean) as T[];
}
