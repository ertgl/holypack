import type { ContextSync } from "../../../context/ContextSync";
import type { UseExtensionCallbackSync } from "../../../extension/interop/UseExtensionCallbackSync";
import { useExtensionSync } from "../../../extension/interop/useExtensionSync";
import type { SystemExtensions } from "../SystemExtensions";
import type { SystemExtensionUID } from "../uid/SystemExtensionUID";

export function useSystemExtensionSync<
  T_ExtensionUID extends SystemExtensionUID = SystemExtensionUID,
  T_Callback extends UseExtensionCallbackSync<SystemExtensions[T_ExtensionUID]> = UseExtensionCallbackSync<SystemExtensions[T_ExtensionUID]>,
  T_ReturnType extends ReturnType<T_Callback> = ReturnType<T_Callback>,
>(
  context: ContextSync,
  extensionUID: T_ExtensionUID,
  callback: T_Callback,
): T_ReturnType
{
  return useExtensionSync<
    T_Callback,
    T_ReturnType
  >(
    context,
    extensionUID,
    callback,
  );
}
