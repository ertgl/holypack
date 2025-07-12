import {
  isAbsolute,
  resolve,
} from "node:path";

/**
 * @param {(() => string) | string} fallbackRootPath
 * @param {string} path
 * @returns {string}
 */
export function absolutifyPath(
  fallbackRootPath,
  path,
)
{
  if (isAbsolute(path))
  {
    return path;
  }

  if (typeof fallbackRootPath === "function")
  {
    fallbackRootPath = fallbackRootPath();
  }

  return resolve(
    fallbackRootPath,
    path,
  );
}
