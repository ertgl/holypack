import type { AugmentVariadic } from "./augmentation";

export type EnforceOrderedStrictness<
  A extends Array<object>,
> = AugmentVariadic<A>;
