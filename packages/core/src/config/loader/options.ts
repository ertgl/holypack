import type { PathLike } from "../../lib/fs";
import type { ConfigDefinition } from "../definition";
import type { ConfigProviderContext } from "../provider";

export type ConfigLoaderOptions = {
  configDefinition?: ConfigDefinition | null;
  configFilePath?: null | string;
  configProviderContext?: null | Partial<ConfigProviderContext>;
  cwd?: null | PathLike;
};
