// eslint-disable-next-line n/no-unsupported-features/node-builtins
import { matchesGlob } from "node:path";

import type { Optional } from "../../object/Optional";
import { resolveCWD } from "../../process/cwd/resolveCWD";
import { absolutifyPath } from "../absolutifyPath";

import type { GlobMatcherOptions } from "./GlobMatcherOptions";

export function globMatch(
  pattern: string | string[],
  path: string,
  options?: Optional<GlobMatcherOptions>,
): boolean
{
  options ??= {};

  const cwd = resolveCWD(options.cwd);

  const patterns = (
    Array.isArray(pattern)
      ? pattern
      : [pattern]
  );

  for (const currentPattern of patterns)
  {
    const currentResolvedPattern = absolutifyPath(
      cwd,
      currentPattern,
    );

    const isMatched = matchesGlob(
      path,
      currentResolvedPattern,
    );

    if (isMatched)
    {
      return true;
    }
  }

  return false;
}
