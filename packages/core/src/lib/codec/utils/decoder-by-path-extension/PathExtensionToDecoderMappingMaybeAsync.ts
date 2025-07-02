import type { PathExtension } from "../../../path/PathExtension";
import type { DecoderMaybeAsync } from "../../DecoderMaybeAsync";

export type PathExtensionToDecoderMappingMaybeAsync<T> = {
  [extension: PathExtension]: DecoderMaybeAsync<T>;
};
