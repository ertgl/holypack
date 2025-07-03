import type { PathExtension } from "../../../path/PathExtension";
import type { DecoderSync } from "../../DecoderSync";

export type PathExtensionToDecoderMappingSync<T> = {
  [extension: PathExtension]: DecoderSync<T>;
};
