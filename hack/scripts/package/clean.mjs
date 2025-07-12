import { resolve } from "node:path";

import { resolveBuildContext } from "@holypack/internal-dev/build/context/resolver/resolveBuildContext.mjs";

import { cleanRecursive } from "../../lib/cleaner/cleanRecursive.mjs";
import { DIST_RELATIVE_PATH } from "../../lib/constants/paths/DIST_RELATIVE_PATH.mjs";
import { DOT_BUILD_RELATIVE_PATH } from "../../lib/constants/paths/DOT_BUILD_RELATIVE_PATH.mjs";

const context = resolveBuildContext();

const entries = [
  [
    resolve(
      context.workspace.paths.root,
      DOT_BUILD_RELATIVE_PATH,
    ),
    "Successfully cleaned temporary build files.",
  ],

  [
    resolve(
      context.workspace.paths.root,
      DIST_RELATIVE_PATH,
    ),
    "Successfully cleaned distribution files.",
  ],
];

for (const [path, message] of entries)
{
  cleanRecursive(
    path,
    message,
  );
}
