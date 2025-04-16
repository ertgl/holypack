import type { ConfigInput } from "./config-input";
import type { CorePluginBinder } from "./core-plugin-binder";

export type ContextResolutionOptions = {
  config?: ConfigInput | null;
  configFilePath?: null | string;
  corePluginBinder?: CorePluginBinder | null;
  cwd?: null | string;
};
