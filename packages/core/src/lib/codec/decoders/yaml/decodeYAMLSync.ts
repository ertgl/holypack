// #[cjs(remove)]
import { createRequire } from "node:module";
// #[cjs(remove)]
import { fileURLToPath } from "node:url";

import type YAMLModule from "yaml";

import { DEFAULT_BUFFER_ENCODING } from "../../../buffer/DEFAULT_BUFFER_ENCODING";
import type { Optional } from "../../../object/Optional";

import type { YAMLDecoderOptions } from "./YAMLDecoderOptions";

// #[cjs(remove)]
const __filename = fileURLToPath(import.meta.url);

// #[cjs(remove)]
const require = createRequire(__filename);

export function decodeYAMLSync<T>(
  data: Buffer | string,
  options?: Optional<YAMLDecoderOptions>,
): T
{
  options ??= {};

  const YAML = require("yaml") as typeof YAMLModule;

  if (Buffer.isBuffer(data))
  {
    data = data.toString(
      options.encoding
      ?? DEFAULT_BUFFER_ENCODING,
    );
  }

  return YAML.parse(
    data,
    options.parserOptions ?? undefined,
  ) as T;
}
