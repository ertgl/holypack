import type { PatchedWithDefined } from "../../lib/object/PatchedWithDefined";
import type { CommandSync } from "../CommandSync";

import type { CommandFactoryOptionsSync } from "./CommandFactoryOptionsSync";

export function createCommandSync<
  T extends CommandFactoryOptionsSync = CommandFactoryOptionsSync,
  T_ReturnType extends PatchedWithDefined<CommandSync, T> = PatchedWithDefined<CommandSync, T>,
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
