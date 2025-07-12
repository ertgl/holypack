import { npx } from "../npx/npx.mjs";

/**
 * @param {string | null} [cwd]
 * @returns {void}
 */
export function updatePackageExports(
  cwd,
)
{
  npx(
    "export-map-generator --config ./exports.config.mjs generate",
    cwd,
  );

  console.info("Successfully updated package exports.");
}
