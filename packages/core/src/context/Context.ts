import type { ContextAsync } from "./ContextAsync";
import type { ContextSync } from "./ContextSync";

export type Context = (
  | ContextAsync
  | ContextSync
);
