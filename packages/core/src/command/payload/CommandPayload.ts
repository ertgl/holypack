import type { CommandPayloadAsync } from "./CommandPayloadAsync";
import type { CommandPayloadSync } from "./CommandPayloadSync";

export type CommandPayload = (
  | CommandPayloadAsync
  | CommandPayloadSync
);
