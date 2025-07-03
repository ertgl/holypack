import { consumeFinalSync } from "../../iterator/consumeFinalSync";
import { consumeOnceSync } from "../../iterator/consumeOnceSync";
import type { Optional } from "../../object/Optional";
import { ascendPathSync } from "../ascender/ascendPathSync";
import type { PathAscenderPredicateSync } from "../ascender/PathAscenderPredicateSync";
import type { Path } from "../Path";
import type { PathLike } from "../PathLike";

import { ROOT_PATH_FINDER_STRATEGY_DEFAULT } from "./ROOT_PATH_FINDER_STRATEGY_DEFAULT";
import { ROOT_PATH_FINDER_STRATEGY_INNERMOST } from "./ROOT_PATH_FINDER_STRATEGY_INNERMOST";
import type { RootPathFinderOptions } from "./RootPathFinderOptions";

export function findRootPathSync(
  pathLike: PathLike,
  predicate: PathAscenderPredicateSync,
  options?: Optional<RootPathFinderOptions>,
): null | Path
{
  options ??= {};

  const strategy = (
    options.strategy
    ?? ROOT_PATH_FINDER_STRATEGY_DEFAULT
  );

  const generator = ascendPathSync(
    pathLike,
    predicate,
  );

  const consume = (
    strategy === ROOT_PATH_FINDER_STRATEGY_INNERMOST
      ? consumeOnceSync
      : consumeFinalSync
  );

  return consume(generator) ?? null;
}
