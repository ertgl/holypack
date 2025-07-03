import type { Command } from "../Command";

import type { CommandFactoryOptionsSync } from "./CommandFactoryOptionsSync";

export function createCommandSync(
  options: CommandFactoryOptionsSync,
): Command
{
  return {
    descriptionLong: options.descriptionLong ?? "",
    descriptionShort: options.descriptionShort ?? "",
    handler: options.handler,
    uid: options.uid,
  };
}
