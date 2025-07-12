import { rmSync } from "node:fs";

/**
 * @param {string} path
 * @param {string | null} [message]
 * @returns {void}
 */
export function cleanRecursive(
  path,
  message,
)
{
  rmSync(
    path,
    {
      force: true,
      recursive: true,
    },
  );

  if (message)
  {
    console.info(message);
  }
}
