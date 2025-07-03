import type { CommandPayloadAsync } from "../payload/CommandPayloadAsync";

export type CommandHandlerAsync = (
  payload: CommandPayloadAsync<any>,
) => Promise<unknown>;
