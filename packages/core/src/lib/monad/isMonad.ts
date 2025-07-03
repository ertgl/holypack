import type { AnyMonad } from "./AnyMonad";
import type { Monad } from "./Monad";

export function isMonad<
  T = unknown,
>(
  value: unknown,
): value is Monad<T>;
export function isMonad(
  value: unknown,
): value is AnyMonad
{
  return (
    typeof value === "function"
    && value.length === 0
  );
}
