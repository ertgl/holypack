import type { ConfigAsync } from "./ConfigAsync";
import type { ConfigSync } from "./ConfigSync";

export type Config = (
  | ConfigAsync
  | ConfigSync
);
