import { decodeJSONSync } from "../../decoders/json/decodeJSONSync";
import { decodeTOMLAsync } from "../../decoders/toml/decodeTOMLAsync";
import { decodeYAMLAsync } from "../../decoders/yaml/decodeYAMLAsync";

import type { PathExtensionToDecoderMappingMaybeAsync } from "./PathExtensionToDecoderMappingMaybeAsync";

export function getPathExtensionToDecoderMappingMaybeAsync<
  T = unknown,
>(): PathExtensionToDecoderMappingMaybeAsync<T>
{
  return {
    ".json": decodeJSONSync<T>,
    ".toml": decodeTOMLAsync<T>,
    ".yaml": decodeYAMLAsync<T>,
    ".yml": decodeYAMLAsync<T>,
  };
}
