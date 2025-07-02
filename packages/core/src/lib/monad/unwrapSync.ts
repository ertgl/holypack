import type { Monad } from "./Monad";

export function unwrapSync<
  T = unknown,
>(
  value: Monad<T>,
): T
{
  return value();
}
