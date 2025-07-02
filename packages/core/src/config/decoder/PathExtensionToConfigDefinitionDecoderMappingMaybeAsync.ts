import type { PathExtensionToDecoderMappingMaybeAsync } from "../../lib/codec/utils/decoder-by-path-extension/PathExtensionToDecoderMappingMaybeAsync";
import type { ConfigDefinitionAsync } from "../definition/ConfigDefinitionAsync";

export type PathExtensionToConfigDefinitionDecoderMappingMaybeAsync<
  T_ConfigDefinition extends ConfigDefinitionAsync = ConfigDefinitionAsync,
> = PathExtensionToDecoderMappingMaybeAsync<T_ConfigDefinition>;
