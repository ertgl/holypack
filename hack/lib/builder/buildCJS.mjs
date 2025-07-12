import { resolveBuildContext } from "@holypack/internal-dev/build/context/resolver/resolveBuildContext.mjs";
import { build } from "@holypack/internal-integration-babel/builder/build.mjs";

import { DIST_CJS_RELATIVE_PATH } from "../constants/paths/DIST_CJS_RELATIVE_PATH.mjs";

const format = "cjs";

/**
 * @param {string | null} [cwd]
 * @returns {Promise<void>}
 */
export async function buildCJS(
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
          dist: DIST_CJS_RELATIVE_PATH,
        },
      },
    }),
    {
      format,
    },
  );

  console.info(`Successfully compiled ${String(compiledFilesCount)} ${format} files with Babel (${String(runtimeFreeFilesCount)} excluded from distribution)`);
}
