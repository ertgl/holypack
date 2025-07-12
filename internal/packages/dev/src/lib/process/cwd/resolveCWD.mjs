import {
  isAbsolute,
  resolve,
} from "node:path";

/**
 * @param {string | null} [cwd]
 * @returns {string}
 */
export function resolveCWD(
  cwd,
)
{
  if (cwd == null)
  {
    return process.cwd();
  }

  if (isAbsolute(cwd))
  {
    return cwd;
  }

  return resolve(
    process.cwd(),
    cwd,
  );
}
