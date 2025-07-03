import type { Optional } from "../object/Optional";
import type { MaybePromise } from "../promise/MaybePromise";

import type { DecoderOptions } from "./DecoderOptions";

export type DecoderMaybeAsync<T> = (
  data: Buffer | string,
  options?: Optional<DecoderOptions>,
) => MaybePromise<T>;
