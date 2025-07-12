import { resolveBuildContext } from "@holypack/internal-dev/build/context/resolver/resolveBuildContext.mjs";

import { updatePackageExports } from "../../lib/builder/updatePackageExports.mjs";

const context = resolveBuildContext();

updatePackageExports(context.workspace.paths.root);
