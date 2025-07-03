import type { Optional } from "@holypack/core/lib/object/Optional";
import type { Path } from "@holypack/core/lib/path/Path";

export type JestPaths = {
  src: Optional<Path>;
  test: Optional<Path>;
};
