import type { ContextSync } from "../../context/ContextSync";
import { requireExtension } from "../registry/requireExtension";
import type { ExtensionUID } from "../uid/ExtensionUID";

import type { UseExtensionCallbackSync } from "./UseExtensionCallbackSync";

export function useExtensionSync<
  T_Callback extends UseExtensionCallbackSync<any>,
  T_ReturnType extends ReturnType<T_Callback>,
>(
  context: ContextSync,
  extensionUID: ExtensionUID,
  callback: T_Callback,
): T_ReturnType
{
  const extension = requireExtension(
    context,
    extensionUID,
  );

  return callback(extension) as T_ReturnType;
}
