import { consumeFinalAsync } from "../../iterator/consumeFinalAsync";
import { consumeOnceAsync } from "../../iterator/consumeOnceAsync";
import type { Optional } from "../../object/Optional";
import { ascendPathAsync } from "../ascender/ascendPathAsync";
import type { PathAscenderPredicateMaybeAsync } from "../ascender/PathAscenderPredicateMaybeAsync";
import type { Path } from "../Path";
import type { PathLike } from "../PathLike";

import { ROOT_PATH_FINDER_STRATEGY_DEFAULT } from "./ROOT_PATH_FINDER_STRATEGY_DEFAULT";
import { ROOT_PATH_FINDER_STRATEGY_INNERMOST } from "./ROOT_PATH_FINDER_STRATEGY_INNERMOST";
import type { RootPathFinderOptions } from "./RootPathFinderOptions";

export async function findRootPathAsync(
  pathLike: PathLike,
  predicate: PathAscenderPredicateMaybeAsync,
  options?: Optional<RootPathFinderOptions>,
): Promise<null | Path>
{
  options ??= {};

  const strategy = (
    options.strategy
    ?? ROOT_PATH_FINDER_STRATEGY_DEFAULT
  );

  const generator = ascendPathAsync(
    pathLike,
    predicate,
  );

  const consume = (
    strategy === ROOT_PATH_FINDER_STRATEGY_INNERMOST
      ? consumeOnceAsync
      : consumeFinalAsync
  );

  return (await consume(generator)) ?? null;
}
