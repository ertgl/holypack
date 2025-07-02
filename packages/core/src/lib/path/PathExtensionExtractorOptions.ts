import type { Optional } from "../object/Optional";

import type { PathExtension } from "./PathExtension";

export type PathExtensionExtractorOptions = {
  candidates?: Optional<Iterable<PathExtension>>;
  fallbackToExtname?: Optional<boolean>;
};
