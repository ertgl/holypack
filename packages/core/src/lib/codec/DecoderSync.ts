import type { Optional } from "../object/Optional";

import type { DecoderOptions } from "./DecoderOptions";

export type DecoderSync<T> = (
  data: Buffer | string,
  options?: Optional<DecoderOptions>,
) => T;
