import { DEFAULT_BUFFER_ENCODING } from "../../../buffer/DEFAULT_BUFFER_ENCODING";
import type { Optional } from "../../../object/Optional";

import type { YAMLDecoderOptions } from "./YAMLDecoderOptions";

export async function decodeYAMLAsync<T>(
  data: Buffer | string,
  options?: Optional<YAMLDecoderOptions>,
): Promise<T>
{
  options ??= {};

  const { parse } = await import("yaml");

  if (Buffer.isBuffer(data))
  {
    data = data.toString(
      options.encoding
      ?? DEFAULT_BUFFER_ENCODING,
    );
  }

  return parse(
    data,
    options.parserOptions ?? undefined,
  ) as T;
}
