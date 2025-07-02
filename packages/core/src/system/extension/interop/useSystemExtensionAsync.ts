import type { ContextAsync } from "../../../context/ContextAsync";
import { useExtensionAsync } from "../../../extension/interop/useExtensionAsync";
import type { UseExtensionCallbackAsync } from "../../../extension/interop/UseExtensionCallbackAsync";
import type { SystemExtensions } from "../SystemExtensions";
import type { SystemExtensionUID } from "../uid/SystemExtensionUID";

export async function useSystemExtensionAsync<
  T_ExtensionUID extends SystemExtensionUID = SystemExtensionUID,
  T_Callback extends UseExtensionCallbackAsync<SystemExtensions[T_ExtensionUID]> = UseExtensionCallbackAsync<SystemExtensions[T_ExtensionUID]>,
  T_ReturnType extends Awaited<ReturnType<T_Callback>> = Awaited<ReturnType<T_Callback>>,
>(
  context: ContextAsync,
  extensionUID: T_ExtensionUID,
  callback: T_Callback,
): Promise<T_ReturnType>
{
  return await useExtensionAsync<
    T_Callback,
    T_ReturnType
  >(
    context,
    extensionUID,
    callback,
  );
}
