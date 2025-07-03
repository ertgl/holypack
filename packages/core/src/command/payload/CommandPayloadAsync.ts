import type { ContextAsync } from "../../context/ContextAsync";
import type { CommandData } from "../data/CommandData";

import type { CommandPayloadBase } from "./CommandPayloadBase";

export type CommandPayloadAsync<
  T_Data = CommandData,
> = (
  & CommandPayloadBase<T_Data>
  & {
    context: ContextAsync;
  }
);
