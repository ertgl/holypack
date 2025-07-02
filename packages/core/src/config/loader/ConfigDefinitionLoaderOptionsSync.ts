import type { DecoderOptions } from "../../lib/codec/DecoderOptions";
import type { Optional } from "../../lib/object/Optional";
import type { StrictPartial } from "../../lib/object/StrictPartial";
import type { PathExtensionToConfigDefinitionDecoderMappingSync } from "../decoder/PathExtensionToConfigDefinitionDecoderMappingSync";

import type { ConfigDefinitionLoaderFSSync } from "./ConfigDefinitionLoaderFSSync";
import type { ConfigDefinitionLoaderOptionsBase } from "./ConfigDefinitionLoaderOptionsBase";

export type ConfigDefinitionLoaderOptionsSync = (
  & ConfigDefinitionLoaderOptionsBase
  & {
    decoderOptions?: Optional<DecoderOptions>;
    fs?: Optional<ConfigDefinitionLoaderFSSync>;
    pathExtensionToDecoderMapping?: Optional<
      StrictPartial<PathExtensionToConfigDefinitionDecoderMappingSync>
    >;
  }
);
