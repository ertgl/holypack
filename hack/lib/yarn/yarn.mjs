import { execSync } from "node:child_process";

import { resolveCWD } from "@holypack/internal-dev/lib/process/cwd/resolveCWD.mjs";

/**
 * @param {string | null | undefined} message
 * @param {string} command
 * @param {string | null} [cwd]
 * @returns {void}
 */
export function yarn(
  message,
  command,
  cwd,
)
{
  cwd = resolveCWD(cwd);

  if (message)
  {
    console.log(message);
  }

  execSync(
    `yarn ${command}`,
    {
      cwd,
      stdio: "inherit",
    },
  );
}
