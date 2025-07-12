import { npx } from "../npx/npx.mjs";

/**
 * @param {string | null} [cwd]
 * @returns {void}
 */
export function buildTypes(
  cwd,
)
{
  npx(
    "tsc --project ./tsconfig.output.types.json",
    cwd,
  );

  console.info("Successfully built types.");
}
