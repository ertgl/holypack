import type { PathLike } from "../lib/fs";

import type { ConfigContext } from "./config-context";
import type { ConfigInput } from "./config-input";

export type ConfigLoaderOptions = {
  configContext?: null | Partial<ConfigContext>;
  configFilePath?: null | string;
  configInput?: ConfigInput | null;
  cwd?: null | PathLike;
};
