import type { CommandData } from "../data/CommandData";

import type { CommandPayloadAsync } from "./CommandPayloadAsync";
import type { CommandPayloadSync } from "./CommandPayloadSync";

export type CommandPayload<
  T_Data = CommandData,
> = (
  | CommandPayloadAsync<T_Data>
  | CommandPayloadSync<T_Data>
);
