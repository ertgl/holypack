import type { PathLike } from "../../../lib/fs";
import type { ConfigProviderContext } from "../../provider";
import type { ConfigDefinition } from "../definition";

export type ConfigDefinitionResolutionOptions = {
  configDefinition?: ConfigDefinition | null;
  configProviderContext?: null | Partial<ConfigProviderContext>;
  cwd?: null | PathLike;
};
