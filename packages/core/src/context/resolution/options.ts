import type { ConfigDefinition } from "../../config/definition";
import type { PathLike } from "../../lib/fs";
import type { ContextInitializerFunction } from "../initializer";

export type ContextResolutionOptions = {
  config?: ConfigDefinition | null;
  configFilePath?: null | string;
  cwd?: null | PathLike;
  initializer?: ContextInitializerFunction | null;
  loadConfigFile?: boolean | null;
};
