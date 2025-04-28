import type { PathLike } from "../../lib/fs";
import { resolveCWD } from "../../lib/process/cwd";
import type { ConfigDefinition } from "../definition";

import { createConfigExplorer } from "./explorer";
import type { ConfigExplorerOptions } from "./options";
import type { ConfigSearchResult } from "./search-result";

export async function searchConfig(
  cwd?: null | PathLike,
  options?: ConfigExplorerOptions | null,
): Promise<ConfigSearchResult>
{
  const explorer = createConfigExplorer(options);

  const cwdString = resolveCWD(cwd);

  const result = await explorer.search(cwdString);

  if (result == null)
  {
    return {
      configDefinition: null,
      filePath: "",
      found: false,
    };
  }

  return {
    configDefinition: (result.config ?? {}) as ConfigDefinition,
    filePath: result.filepath,
    found: true,
  };
}
