import type { Context } from "../../context/Context";
import type { Extension } from "../Extension";
import type { ExtensionUID } from "../uid/ExtensionUID";

export function getExtension<
  T_Extension extends Extension = Extension,
>(
  context: Context,
  extensionUID: ExtensionUID,
): T_Extension | undefined
{
  return context.extensions.get(extensionUID) as T_Extension | undefined;
}
