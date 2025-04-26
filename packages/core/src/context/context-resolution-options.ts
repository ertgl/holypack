import type { SystemPluginBinder } from "../bootstrap";
import type { ConfigInput } from "../config";
import type { PathLike } from "../lib/fs";

import type { Context } from "./context";

export type ContextResolutionOptions = {
  config?: ConfigInput | null;
  configFilePath?: null | string;
  cwd?: null | PathLike;
  overrides?: null | Partial<Context>;
  systemPluginBinder?: null | SystemPluginBinder;
};
