import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

import type FastGlobModule from "fast-glob";

import type { PathLike } from "../../../../../fs";
import { resolveCWD } from "../../../../../utils/process/cwd";

const __filename = fileURLToPath(import.meta.url);

const require = createRequire(__filename);

const fastGlob = require("fast-glob") as typeof FastGlobModule;
const glob = fastGlob.glob.bind(fastGlob);

export async function findWorkspacePathsByGlobPatterns(
  cwd: PathLike,
  workspaceGlobPatterns: string[],
): Promise<string[]>
{
  const cwdString = resolveCWD(cwd);

  return await glob(
    workspaceGlobPatterns,
    // TODO(ertgl): Allow to pass custom FS to the fast-glob function.
    {
      absolute: true,
      cwd: cwdString,
      dot: true,
      onlyDirectories: true,
      unique: true,
    },
  );
}
