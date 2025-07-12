import { resolveBuildContext } from "@holypack/internal-dev/build/context/resolver/resolveBuildContext.mjs";

import { bootstrapCJS } from "../../lib/builder/bootstrapCJS.mjs";
import { updatePackageExportsForBootstrap } from "../../lib/builder/updatePackageExportsForBootstrap.mjs";

const context = resolveBuildContext();

await bootstrapCJS(context.workspace.paths.root);

updatePackageExportsForBootstrap(context.workspace.paths.root);
