// #[cjs(remove)]
import { createRequire } from "node:module";
import {
  isAbsolute as isAbsolutePath,
  resolve as resolvePath,
} from "node:path";
// #[cjs(remove)]
import { fileURLToPath } from "node:url";

import type PicomatchModule from "picomatch";

import type { PathLike } from "../../../lib/fs";
import { convertPathLikeToString } from "../utils/path-like-converter";

// #[cjs(remove)]
const __filename = fileURLToPath(import.meta.url);

// #[cjs(remove)]
const require = createRequire(__filename);

const picomatch = require("picomatch") as typeof PicomatchModule;
const isGlobMatch = picomatch.isMatch.bind(picomatch);

export function globMatch(
  cwd: PathLike,
  path: string,
  patterns: string[],
): boolean
{
  const cwdString = convertPathLikeToString(cwd);

  return isGlobMatch(
    (
      isAbsolutePath(path)
        ? path
        : resolvePath(cwdString, path)
    ),
    patterns.map(
      (pattern) =>
      {
        return (
          isAbsolutePath(pattern)
            ? pattern
            : resolvePath(
                cwdString,
                pattern,
              )
        );
      },
    ),
    {
      bash: true,
      cwd: cwdString,
      dot: true,
      // eslint-disable-next-line @cspell/spellchecker
      nobrace: true,
      // eslint-disable-next-line @cspell/spellchecker
      nobracket: true,
      // eslint-disable-next-line @cspell/spellchecker
      noext: true,
      // eslint-disable-next-line @cspell/spellchecker
      noextglob: true,
      // eslint-disable-next-line @cspell/spellchecker
      noglobstar: true,
      // eslint-disable-next-line @cspell/spellchecker
      noquantifiers: true,
    },
  );
}
