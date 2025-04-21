import type { PathLike } from "../../fs";

export function convertPathLikeToString(
  path: PathLike,
): string
{
  if (typeof path === "string")
  {
    return path;
  }
  if (path instanceof URL)
  {
    return path.toString();
  }
  if (Buffer.isBuffer(path))
  {
    return path.toString("utf8");
  }
  const err = new TypeError(
    `Expected path to be a string, URL, or Buffer, but got ${typeof path}`,
  );
  throw err;
}
