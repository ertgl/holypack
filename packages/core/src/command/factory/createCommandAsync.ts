import type { Command } from "../Command";

import type { CommandFactoryOptionsAsync } from "./CommandFactoryOptionsAsync";

export function createCommandAsync(
  options: CommandFactoryOptionsAsync,
): Command
{
  return {
    descriptionLong: options.descriptionLong ?? "",
    descriptionShort: options.descriptionShort ?? "",
    handler: options.handler,
    uid: options.uid,
  };
}
