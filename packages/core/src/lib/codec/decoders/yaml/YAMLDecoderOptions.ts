import type { ParseOptions } from "yaml";

import type { Optional } from "../../../object/Optional";
import type { DecoderOptions } from "../../DecoderOptions";

export type YAMLDecoderOptions = (
  & DecoderOptions
  & {
    parserOptions?: Optional<ParseOptions>;
  }
);
