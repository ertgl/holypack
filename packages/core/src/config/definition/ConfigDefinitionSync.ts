import type { Extension } from "../../extension/Extension";
import type { ExtensionLoadingSpecSync } from "../../extension/loader/ExtensionLoadingSpecSync";
import type { Compactible } from "../../lib/array/Compactible";

import type { ConfigDefinitionBase } from "./ConfigDefinitionBase";

export type ConfigDefinitionSync = (
  & ConfigDefinitionBase
  & {
    extensions?: Compactible<Extension | ExtensionLoadingSpecSync>;
  }
);
