import type { PatchedWithDefined } from "../../lib/object/PatchedWithDefined";
import type { CommandAsync } from "../CommandAsync";

import type { CommandFactoryOptionsAsync } from "./CommandFactoryOptionsAsync";

export function createCommandAsync<
  T extends CommandFactoryOptionsAsync = CommandFactoryOptionsAsync,
  T_ReturnType extends PatchedWithDefined<CommandAsync, T> = PatchedWithDefined<CommandAsync, T>,
>(
  options: T,
): T_ReturnType
{
  return {
    descriptionLong: options.descriptionLong ?? "",
    descriptionShort: options.descriptionShort ?? "",
    handler: options.handler,
    uid: options.uid,
  } as unknown as T_ReturnType;
}
