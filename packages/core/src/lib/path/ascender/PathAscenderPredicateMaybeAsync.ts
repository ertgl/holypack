import type { MaybePromise } from "../../promise/MaybePromise";
import type { Path } from "../Path";

export type PathAscenderPredicateMaybeAsync = (
  path: Path,
) => MaybePromise<boolean>;
