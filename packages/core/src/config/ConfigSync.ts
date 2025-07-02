import type { Compact } from "../lib/array/Compact";
import type { Mandatory } from "../lib/object/Mandatory";

import type { ConfigBase } from "./ConfigBase";
import type { ConfigDefinitionSync } from "./definition/ConfigDefinitionSync";

export type ConfigSync = (
  & ConfigBase
  & {
    extensions: Compact<ConfigDefinitionSync["extensions"]>;
    fs: Mandatory<ConfigDefinitionSync["fs"]>;
  }
);
