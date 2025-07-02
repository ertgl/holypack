import type { DecoderOptions } from "../../lib/codec/DecoderOptions";
import type { Optional } from "../../lib/object/Optional";
import type { StrictPartial } from "../../lib/object/StrictPartial";
import type { PathExtensionToConfigDefinitionDecoderMappingMaybeAsync } from "../decoder/PathExtensionToConfigDefinitionDecoderMappingMaybeAsync";

import type { ConfigDefinitionLoaderFSAsync } from "./ConfigDefinitionLoaderFSAsync";
import type { ConfigDefinitionLoaderOptionsBase } from "./ConfigDefinitionLoaderOptionsBase";

export type ConfigDefinitionLoaderOptionsAsync = (
  & ConfigDefinitionLoaderOptionsBase
  & {
    decoderOptions?: Optional<DecoderOptions>;
    fs?: Optional<ConfigDefinitionLoaderFSAsync>;
    pathExtensionToDecoderMapping?: Optional<
      StrictPartial<PathExtensionToConfigDefinitionDecoderMappingMaybeAsync>
    >;
  }
);
