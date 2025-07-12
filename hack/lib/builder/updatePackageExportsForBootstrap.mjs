import { npx } from "../npx/npx.mjs";

/**
 * @param {string | null} [cwd]
 * @returns {void}
 */
export function updatePackageExportsForBootstrap(
  cwd,
)
{
  npx(
    "export-map-generator --config ./exports.config.bootstrap.mjs generate",
    cwd,
  );

  console.info("Successfully updated package exports for bootstrap phase.");
}
