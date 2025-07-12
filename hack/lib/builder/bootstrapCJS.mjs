import { resolveBuildContext } from "@holypack/internal-dev/build/context/resolver/resolveBuildContext.mjs";
import { build } from "@holypack/internal-integration-babel/builder/build.mjs";

import { BOOTSTRAP_CJS_RELATIVE_PATH } from "../constants/paths/BOOTSTRAP_CJS_RELATIVE_PATH.mjs";

const format = "cjs";

/**
 * @param {string | null} [cwd]
 * @returns {Promise<void>}
 */
export async function bootstrapCJS(
  cwd,
)
{
  const {
    compiledFilesCount,
    runtimeFreeFilesCount,
  } = await build(
    resolveBuildContext({
      workspace: {
        paths: {
          dist: BOOTSTRAP_CJS_RELATIVE_PATH,
        },
      },
    }),
    {
      configFilePath: "babel.config.bootstrap.cjs.mjs",
      format,
    },
  );

  console.info(`Successfully compiled ${String(compiledFilesCount)} ${format} files for bootstrap phase with Babel (${String(runtimeFreeFilesCount)} excluded from distribution)`);
}
