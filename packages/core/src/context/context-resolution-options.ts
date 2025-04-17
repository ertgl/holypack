import type { ConfigInput } from "../config";
import type { SystemPluginBinder } from "../system-defaults";

export type ContextResolutionOptions = {
  config?: ConfigInput | null;
  configFilePath?: null | string;
  cwd?: null | string;
  systemPluginBinder?: null | SystemPluginBinder;
};
