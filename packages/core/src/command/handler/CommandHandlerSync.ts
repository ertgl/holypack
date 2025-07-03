import type { CommandPayloadSync } from "../payload/CommandPayloadSync";

export type CommandHandlerSync = (
  payload: CommandPayloadSync<any>,
) => unknown;
