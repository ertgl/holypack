import type { Monad } from "./Monad";

export function wrap<T>(
  value: T,
): Monad<T>
{
  return () => value;
}
