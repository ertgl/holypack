import type { Optional } from "../../lib/object/Optional";
import type { Path } from "../../lib/path/Path";

export type ConfigDefinitionContext = {
  cwd: Path;
  referrerPath: Optional<Path>;
};
