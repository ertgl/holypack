import type { ConfigDefinitionAsync } from "../../config/definition/ConfigDefinitionAsync";
import type { ConfigFilePathFinderOptionsAsync } from "../../config/explorer/ConfigFilePathFinderOptionsAsync";
import type { ConfigDefinitionLoaderOptionsAsync } from "../../config/loader/ConfigDefinitionLoaderOptionsAsync";
import type { ConfigDefinitionProviderMaybeAsync } from "../../config/provider/ConfigDefinitionProviderMaybeAsync";
import type { Optional } from "../../lib/object/Optional";
import type { PathLike } from "../../lib/path/PathLike";
import type { SystemExtensionsBinderAsync } from "../../system/extension/binder/SystemExtensionsBinderAsync";
import type { SystemHooksBinderAsync } from "../../system/hook/binder/SystemHooksBinderAsync";

export type ContextResolutionOptionsBaseAsync = {
  config?: Optional<ConfigDefinitionAsync | ConfigDefinitionProviderMaybeAsync>;
  configDefinitionLoaderOptions?: Optional<ConfigDefinitionLoaderOptionsAsync>;
  configFilePathFinderOptions?: Optional<ConfigFilePathFinderOptionsAsync>;
  cwd?: Optional<PathLike>;
  loadConfigFile?: Optional<boolean>;
  postConfig?: Optional<ConfigDefinitionAsync | ConfigDefinitionProviderMaybeAsync>;
  preConfig?: Optional<ConfigDefinitionAsync | ConfigDefinitionProviderMaybeAsync>;
  systemExtensionsBinder?: Optional<SystemExtensionsBinderAsync>;
  systemHooksBinder?: Optional<SystemHooksBinderAsync>;
};
