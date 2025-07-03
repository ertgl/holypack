import type { CommandData } from "../data/CommandData";

export type CommandPayloadBase<
  T_Data = CommandData,
> = {
  data: T_Data;
};
