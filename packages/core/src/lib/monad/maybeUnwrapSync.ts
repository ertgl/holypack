import { isMonad } from "./isMonad";
import type { MaybeWrapped } from "./MaybeWrapped";
import { unwrapSync } from "./unwrapSync";

export function maybeUnwrapSync<
  T = unknown,
>(
  value: MaybeWrapped<T>,
): T
{
  if (isMonad(value))
  {
    return unwrapSync(value);
  }

  return value;
}
