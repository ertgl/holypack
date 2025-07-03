import type { MaybePromise } from "../../lib/promise/MaybePromise";
import type { CommandPayloadAsync } from "../payload/CommandPayloadAsync";

export type CommandHandlerMaybeAsync = (
  payload: CommandPayloadAsync<any>,
) => MaybePromise<unknown>;
