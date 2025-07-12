// eslint-disable-next-line n/no-unsupported-features/node-builtins
import { globSync } from "node:fs";

import { getDefaultExcludedSourceFilePathGlobPatterns } from "./getDefaultExcludedSourceFilePathGlobPatterns.mjs";

/**
 * @import { type Dirent } from "node:fs";
 * @import { type SourceFileDirentGlobOptions } from "./SourceFileDirentGlobOptions.mjs";
 */

/**
 * @param {string} srcDirectoryPath
 * @param {SourceFileDirentGlobOptions | null} [options]
 * @returns {Dirent[]}
 */
export function getSourceFileDirents(
  srcDirectoryPath,
  options,
)
{
  options ??= {};

  const exclude = (
    options.exclude
    ?? getDefaultExcludedSourceFilePathGlobPatterns()
  );

  return globSync(
    [
      "**/*.{cj,ct,j,mj,mt,t}s",
      "**/*.json",
    ],
    {
      cwd: srcDirectoryPath,
      exclude,
      withFileTypes: true,
    },
  );
}
