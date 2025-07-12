import { resolveBuildContext } from "@holypack/internal-dev/build/context/resolver/resolveBuildContext.mjs";

import { buildCJS } from "../../lib/builder/buildCJS.mjs";
import { buildESM } from "../../lib/builder/buildESM.mjs";
import { buildTypes } from "../../lib/builder/buildTypes.mjs";
import { updatePackageExports } from "../../lib/builder/updatePackageExports.mjs";

const context = resolveBuildContext();

buildTypes(context.workspace.paths.root);

await buildCJS(context.workspace.paths.root);
await buildESM(context.workspace.paths.root);

updatePackageExports(context.workspace.paths.root);
