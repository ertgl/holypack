import { resolveBuildContext } from "@holypack/internal-dev/build/context/resolver/resolveBuildContext.mjs";
import { build } from "@holypack/internal-integration-babel/builder/build.mjs";

import { DIST_ESM_RELATIVE_PATH } from "../constants/paths/DIST_ESM_RELATIVE_PATH.mjs";

const format = "esm";

/**
 * @param {string | null} [cwd]
 * @returns {Promise<void>}
 */
export async function buildESM(
  cwd,
)
{
  const {
    compiledFilesCount,
    runtimeFreeFilesCount,
  } = await build(
    resolveBuildContext({
      cwd,
      workspace: {
        paths: {
          dist: DIST_ESM_RELATIVE_PATH,
        },
      },
    }),
    {
      format,
    },
  );

  console.info(`Successfully compiled ${String(compiledFilesCount)} ${format} files with Babel (${String(runtimeFreeFilesCount)} excluded from distribution)`);
}
