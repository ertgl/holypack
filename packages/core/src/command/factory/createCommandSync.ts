import type { CommandSync } from "../CommandSync";

import type { CommandFactoryOptionsSync } from "./CommandFactoryOptionsSync";

export function createCommandSync(
  options: CommandFactoryOptionsSync,
): CommandSync
{
  return {
    descriptionLong: options.descriptionLong ?? "",
    descriptionShort: options.descriptionShort ?? "",
    handler: options.handler,
    uid: options.uid,
  };
}
