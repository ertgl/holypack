import { DEFAULT_BUFFER_ENCODING } from "../../../buffer/DEFAULT_BUFFER_ENCODING";
import type { Optional } from "../../../object/Optional";
import type { DecoderOptions } from "../../DecoderOptions";

export async function decodeTOMLAsync<T>(
  data: Buffer | string,
  options?: Optional<DecoderOptions>,
): Promise<T>
{
  options ??= {};

  const { parse } = await import("toml");

  if (Buffer.isBuffer(data))
  {
    data = data.toString(
      options.encoding
      ?? DEFAULT_BUFFER_ENCODING,
    );
  }

  return parse(data) as T;
}
