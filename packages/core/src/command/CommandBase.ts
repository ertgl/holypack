import type { CommandUID } from "./uid/CommandUID";

export type CommandBase = {
  descriptionLong: string;
  descriptionShort: string;
  uid: CommandUID;
};
