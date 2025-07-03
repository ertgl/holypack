import type { CommandAsync } from "../CommandAsync";

import type { CommandFactoryOptionsAsync } from "./CommandFactoryOptionsAsync";

export function createCommandAsync(
  options: CommandFactoryOptionsAsync,
): CommandAsync
{
  return {
    descriptionLong: options.descriptionLong ?? "",
    descriptionShort: options.descriptionShort ?? "",
    handler: options.handler,
    uid: options.uid,
  };
}
