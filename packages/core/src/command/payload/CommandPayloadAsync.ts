import type { ContextAsync } from "../../context/ContextAsync";

import type { CommandPayloadBase } from "./CommandPayloadBase";

export type CommandPayloadAsync = (
  & CommandPayloadBase
  & {
    context: ContextAsync;
  }
);
