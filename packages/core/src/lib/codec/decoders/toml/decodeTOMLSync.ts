// #[cjs(remove)]
import { createRequire } from "node:module";
// #[cjs(remove)]
import { fileURLToPath } from "node:url";

import type TOMLModule from "toml";

import { DEFAULT_BUFFER_ENCODING } from "../../../buffer/DEFAULT_BUFFER_ENCODING";
import type { Optional } from "../../../object/Optional";
import type { DecoderOptions } from "../../DecoderOptions";

// #[cjs(remove)]
const __filename = fileURLToPath(import.meta.url);

// #[cjs(remove)]
const require = createRequire(__filename);

export function decodeTOMLSync<T>(
  data: Buffer | string,
  options?: Optional<DecoderOptions>,
): T
{
  options ??= {};

  const TOML = require("toml") as typeof TOMLModule;

  if (Buffer.isBuffer(data))
  {
    data = data.toString(
      options.encoding
      ?? DEFAULT_BUFFER_ENCODING,
    );
  }

  return TOML.parse(data) as T;
}
