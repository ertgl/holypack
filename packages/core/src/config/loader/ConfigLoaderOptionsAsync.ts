import type { ConfigFilePathFinderOptionsAsync } from "../../config/explorer/ConfigFilePathFinderOptionsAsync";
import type { ConfigDefinitionLoaderOptionsAsync } from "../../config/loader/ConfigDefinitionLoaderOptionsAsync";
import type { Optional } from "../../lib/object/Optional";

import type { ConfigLoaderFSAsync } from "./ConfigLoaderFSAsync";
import type { ConfigLoaderOptionsBase } from "./ConfigLoaderOptionsBase";

export type ConfigLoaderOptionsAsync = (
  & ConfigLoaderOptionsBase
  & {
    configDefinitionLoaderOptions?: Optional<ConfigDefinitionLoaderOptionsAsync>;
    configFilePathFinderOptions?: Optional<ConfigFilePathFinderOptionsAsync>;
    fs?: Optional<ConfigLoaderFSAsync>;
  }
);
