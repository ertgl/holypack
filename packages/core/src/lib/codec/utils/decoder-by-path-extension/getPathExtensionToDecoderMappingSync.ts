import { decodeJSONSync } from "../../decoders/json/decodeJSONSync";
import { decodeTOMLSync } from "../../decoders/toml/decodeTOMLSync";
import { decodeYAMLSync } from "../../decoders/yaml/decodeYAMLSync";

import type { PathExtensionToDecoderMappingSync } from "./PathExtensionToDecoderMappingSync";

export function getPathExtensionToDecoderMappingSync<
  T = unknown,
>(): PathExtensionToDecoderMappingSync<T>
{
  return {
    ".json": decodeJSONSync<T>,
    ".toml": decodeTOMLSync<T>,
    ".yaml": decodeYAMLSync<T>,
    ".yml": decodeYAMLSync<T>,
  };
}
