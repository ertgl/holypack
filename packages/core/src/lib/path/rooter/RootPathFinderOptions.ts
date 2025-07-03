import type { Optional } from "../../object/Optional";

import type { RootPathFinderStrategy } from "./RootPathFinderStrategy";

export type RootPathFinderOptions = {
  strategy?: Optional<RootPathFinderStrategy>;
};
