import { extname } from "node:path";

import type { Optional } from "../object/Optional";
import { orderStringsByLongestPrefix } from "../string/orderStringsByLongestPrefix";

import type { PathExtension } from "./PathExtension";
import type { PathExtensionExtractorOptions } from "./PathExtensionExtractorOptions";
import type { PathLike } from "./PathLike";
import { pathLikeToPath } from "./pathLikeToPath";

export function extractPathExtension(
  pathLike: PathLike,
  options?: Optional<PathExtensionExtractorOptions>,
): PathExtension
{
  options ??= {};

  const path = pathLikeToPath(pathLike);

  if (options.candidates == null)
  {
    return extname(path);
  }

  const candidates = Array.from(options.candidates);

  const fallbackToExtname = (
    options.fallbackToExtname
    ?? true
  );

  if (candidates.length > 0)
  {
    orderStringsByLongestPrefix(candidates);

    for (const candidate of candidates)
    {
      if (path.endsWith(candidate))
      {
        return candidate;
      }
    }
  }

  if (fallbackToExtname)
  {
    return extname(path);
  }

  return "";
}
