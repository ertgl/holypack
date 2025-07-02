import type { ConfigFilePathFinderOptionsSync } from "../../config/explorer/ConfigFilePathFinderOptionsSync";
import type { ConfigDefinitionLoaderOptionsSync } from "../../config/loader/ConfigDefinitionLoaderOptionsSync";
import type { Optional } from "../../lib/object/Optional";
import type { PathLike } from "../../lib/path/PathLike";

export type ContextConfigurationByFileOptionsSync = {
  configDefinitionLoaderOptions?: Optional<ConfigDefinitionLoaderOptionsSync>;
  configFilePathFinderOptions?: Optional<ConfigFilePathFinderOptionsSync>;
  cwd?: Optional<PathLike>;
};
