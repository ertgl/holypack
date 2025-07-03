import type { ConfigFilePathFinderOptionsAsync } from "../../config/explorer/ConfigFilePathFinderOptionsAsync";
import type { ConfigDefinitionLoaderOptionsAsync } from "../../config/loader/ConfigDefinitionLoaderOptionsAsync";
import type { Optional } from "../../lib/object/Optional";
import type { PathLike } from "../../lib/path/PathLike";

export type ContextConfigurationByFileOptionsAsync = {
  configDefinitionLoaderOptions?: Optional<ConfigDefinitionLoaderOptionsAsync>;
  configFilePathFinderOptions?: Optional<ConfigFilePathFinderOptionsAsync>;
  cwd?: Optional<PathLike>;
};
