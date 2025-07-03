import type { Extension } from "../../extension/Extension";
import type { ExtensionLoadingSpecAsync } from "../../extension/loader/ExtensionLoadingSpecAsync";
import type { Compactible } from "../../lib/array/Compactible";

import type { ConfigDefinitionBase } from "./ConfigDefinitionBase";

export type ConfigDefinitionAsync = (
  & ConfigDefinitionBase
  & {
    extensions?: Compactible<Extension | ExtensionLoadingSpecAsync>;
  }
);
