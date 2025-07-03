import type { Optional } from "@holypack/core/lib/object/Optional";

import type { TSConfigRootPathFinderFSAsync } from "./TSConfigRootPathFinderFSAsync";
import type { TSConfigRootPathFinderOptionsBase } from "./TSConfigRootPathFinderOptionsBase";

export type TSConfigRootPathFinderOptionsAsync = (
  & TSConfigRootPathFinderOptionsBase
  & {
    fs?: Optional<TSConfigRootPathFinderFSAsync>;
  }
);
