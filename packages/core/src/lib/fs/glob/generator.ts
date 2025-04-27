import { readdir } from "node:fs";
// #[cfg(esm) ?? __NODE_PATH__.remove()]
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

import type {
  Entry as FastGlobEntry,
  default as FastGlobModule,
} from "fast-glob";

import { resolveCWD } from "../../process/cwd";
import type { PathLike } from "../path-like";

import type { GlobEntry } from "./entry";
import type { GlobOptions } from "./options";

// #[cfg(esm) ?? __NODE_PATH__.remove()]
const __filename = fileURLToPath(import.meta.url);

// #[cfg(esm) ?? __NODE_PATH__.remove()]
const require = createRequire(__filename);

const fastGlob = require("fast-glob") as typeof FastGlobModule;
const globStream = fastGlob.globStream.bind(fastGlob);

export async function* glob(
  cwd: PathLike,
  patterns: string[],
  options?: GlobOptions | null,
): AsyncGenerator<GlobEntry>
{
  const cwdString = resolveCWD(cwd);

  options ??= {};

  const fastGlobEntryStream = globStream(
    patterns,
    {
      absolute: true,
      concurrency: options.concurrency ?? undefined,
      cwd: cwdString,
      dot: true,
      followSymbolicLinks: options.followSymbolicLinks ?? true,
      fs: {
        ...options.fs,
        readdir: options.fs?.readdir ?? readdir,
      },
      ignore: options.ignore ?? undefined,
      objectMode: true,
      onlyDirectories: options.onlyDirectories ?? false,
      onlyFiles: options.onlyFiles ?? false,
      stats: false,
      unique: true,
    },
  );

  for await (const untypedFastGlobEntry of fastGlobEntryStream)
  {
    const fastGlobEntry = untypedFastGlobEntry as unknown as FastGlobEntry;

    const entry: GlobEntry = {
      _dirent: fastGlobEntry.dirent,
      path: fastGlobEntry.path,
    };

    yield entry;
  }
}
