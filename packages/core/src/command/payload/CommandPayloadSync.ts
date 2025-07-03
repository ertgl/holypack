import type { ContextSync } from "../../context/ContextSync";
import type { CommandData } from "../data/CommandData";

import type { CommandPayloadBase } from "./CommandPayloadBase";

export type CommandPayloadSync<
  T_Data = CommandData,
> = (
  & CommandPayloadBase<T_Data>
  & {
    context: ContextSync;
  }
);
