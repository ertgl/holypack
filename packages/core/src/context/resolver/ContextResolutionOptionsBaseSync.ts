import type { ConfigDefinitionSync } from "../../config/definition/ConfigDefinitionSync";
import type { ConfigFilePathFinderOptionsSync } from "../../config/explorer/ConfigFilePathFinderOptionsSync";
import type { ConfigDefinitionLoaderOptionsSync } from "../../config/loader/ConfigDefinitionLoaderOptionsSync";
import type { ConfigDefinitionProviderSync } from "../../config/provider/ConfigDefinitionProviderSync";
import type { Optional } from "../../lib/object/Optional";
import type { PathLike } from "../../lib/path/PathLike";
import type { SystemExtensionsBinderSync } from "../../system/extension/binder/SystemExtensionsBinderSync";
import type { SystemHooksBinderSync } from "../../system/hook/binder/SystemHooksBinderSync";

export type ContextResolutionOptionsBaseSync = {
  config?: Optional<ConfigDefinitionProviderSync | ConfigDefinitionSync>;
  configDefinitionLoaderOptions?: Optional<ConfigDefinitionLoaderOptionsSync>;
  configFilePathFinderOptions?: Optional<ConfigFilePathFinderOptionsSync>;
  cwd?: Optional<PathLike>;
  loadConfigFile?: Optional<boolean>;
  postConfig?: Optional<Array<ConfigDefinitionProviderSync | ConfigDefinitionSync>>;
  preConfig?: Optional<Array<ConfigDefinitionProviderSync | ConfigDefinitionSync>>;
  systemExtensionsBinder?: Optional<SystemExtensionsBinderSync>;
  systemHooksBinder?: Optional<SystemHooksBinderSync>;
};
