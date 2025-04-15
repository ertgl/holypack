import {
  createConfigExplorer,
  createConfigSyncExplorer,
} from "./config-explorer";
import type { ConfigExplorerOptions } from "./config-explorer-options";
import type { ConfigInput } from "./config-input";
import type { ConfigSearchResult } from "./config-search-result";

export async function searchConfig(
  directoryPath?: null | string,
  options?: ConfigExplorerOptions | null,
): Promise<ConfigSearchResult>
{
  const explorer = createConfigExplorer(options);

  const result = await explorer.search(
    directoryPath ?? undefined,
  );

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

export function searchConfigSync(
  directoryPath?: null | string,
  options?: ConfigExplorerOptions | null,
): ConfigSearchResult
{
  const explorer = createConfigSyncExplorer(options);

  const result = explorer.search(
    directoryPath ?? undefined,
  );

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
