import type { SystemPluginBinder } from "../bootstrap";
import type { ConfigInput } from "../config";

export type ContextResolutionOptions = {
  config?: ConfigInput | null;
  configFilePath?: null | string;
  cwd?: null | string;
  systemPluginBinder?: null | SystemPluginBinder;
};
