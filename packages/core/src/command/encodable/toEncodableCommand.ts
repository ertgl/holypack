import type { Command } from "../Command";

import type { EncodableCommand } from "./EncodableCommand";

export function toEncodableCommand(
  command: Command,
): EncodableCommand
{
  return {
    descriptionLong: command.descriptionLong,
    descriptionShort: command.descriptionShort,
    uid: command.uid,
  };
}
