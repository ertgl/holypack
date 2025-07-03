import type { Optional } from "../../lib/object/Optional";

import type { ConfigFilePathFinderFSSync } from "./ConfigFilePathFinderFSSync";

export type ConfigFilePathFinderOptionsFSTraitSync = {
  fs?: Optional<ConfigFilePathFinderFSSync>;
};
