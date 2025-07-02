import { DEFAULT_BUFFER_ENCODING } from "../../../buffer/DEFAULT_BUFFER_ENCODING";
import type { Optional } from "../../../object/Optional";
import type { DecoderOptions } from "../../DecoderOptions";

export function decodeJSONSync<T>(
  data: Buffer | string,
  options?: Optional<DecoderOptions>,
): T
{
  if (typeof data === "string")
  {
    return JSON.parse(data) as T;
  }

  return JSON.parse(
    data.toString(
      options?.encoding
      ?? DEFAULT_BUFFER_ENCODING,
    ),
  ) as T;
}
