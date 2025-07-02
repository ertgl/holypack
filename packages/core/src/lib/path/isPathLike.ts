import type { PathLike } from "./PathLike";

export function isPathLike(
  value: unknown,
): value is PathLike
{
  return (
    typeof value === "string"
    || value instanceof URL
    || Buffer.isBuffer(value)
  );
}
