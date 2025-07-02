import type { PathExtensionToDecoderMappingSync } from "../../lib/codec/utils/decoder-by-path-extension/PathExtensionToDecoderMappingSync";
import type { ConfigDefinitionSync } from "../definition/ConfigDefinitionSync";

export type PathExtensionToConfigDefinitionDecoderMappingSync<
  T_ConfigDefinition extends ConfigDefinitionSync = ConfigDefinitionSync,
> = PathExtensionToDecoderMappingSync<T_ConfigDefinition>;
