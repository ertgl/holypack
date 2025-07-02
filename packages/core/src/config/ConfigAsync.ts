import type { Compact } from "../lib/array/Compact";
import type { Mandatory } from "../lib/object/Mandatory";

import type { ConfigBase } from "./ConfigBase";
import type { ConfigDefinitionAsync } from "./definition/ConfigDefinitionAsync";

export type ConfigAsync = (
  & ConfigBase
  & {
    extensions: Compact<ConfigDefinitionAsync["extensions"]>;
    fs: Mandatory<ConfigDefinitionAsync["fs"]>;
  }
);
