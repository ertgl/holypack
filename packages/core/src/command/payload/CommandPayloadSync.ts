import type { ContextSync } from "../../context/ContextSync";

import type { CommandPayloadBase } from "./CommandPayloadBase";

export type CommandPayloadSync = (
  & CommandPayloadBase
  & {
    context: ContextSync;
  }
);
