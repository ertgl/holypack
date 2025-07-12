import { execSync } from "node:child_process";

import { resolveCWD } from "@holypack/internal-dev/lib/process/cwd/resolveCWD.mjs";

/**
 * @param {string} command
 * @param {string | null} [cwd]
 * @returns {void}
 */
export function npx(
  command,
  cwd,
)
{
  cwd = resolveCWD(cwd);

  execSync(
    `npx ${command}`,
    {
      cwd,
      stdio: "inherit",
    },
  );
}
