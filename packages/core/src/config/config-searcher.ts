import type { PathLike } from "../fs";
import { resolveCWD } from "../utils/process/cwd";

import { createConfigExplorer } from "./config-explorer";
import type { ConfigExplorerOptions } from "./config-explorer-options";
import type { ConfigInput } from "./config-input";
import type { ConfigSearchResult } from "./config-search-result";

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
      configInput: null,
      filePath: "",
      found: false,
    };
  }

  return {
    configInput: (result.config ?? {}) as ConfigInput,
    filePath: result.filepath,
    found: true,
  };
}
