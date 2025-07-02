import type { Optional } from "@holypack/core/lib/object/Optional";

import type { TSConfigRootPathFinderFSSync } from "./TSConfigRootPathFinderFSSync";
import type { TSConfigRootPathFinderOptionsBase } from "./TSConfigRootPathFinderOptionsBase";

export type TSConfigRootPathFinderOptionsSync = (
  & TSConfigRootPathFinderOptionsBase
  & {
    fs?: Optional<TSConfigRootPathFinderFSSync>;
  }
);
