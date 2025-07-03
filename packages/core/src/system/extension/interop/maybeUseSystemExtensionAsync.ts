import type { ContextAsync } from "../../../context/ContextAsync";
import { maybeUseExtensionAsync } from "../../../extension/interop/maybeUseExtensionAsync";
import type { UseExtensionCallbackMaybeAsync } from "../../../extension/interop/UseExtensionCallbackMaybeAsync";
import type { SystemExtensions } from "../SystemExtensions";
import type { SystemExtensionUID } from "../uid/SystemExtensionUID";

export async function maybeUseSystemExtensionAsync<
  T_ExtensionUID extends SystemExtensionUID = SystemExtensionUID,
  T_Callback extends UseExtensionCallbackMaybeAsync<SystemExtensions[T_ExtensionUID]> = UseExtensionCallbackMaybeAsync<SystemExtensions[T_ExtensionUID]>,
  T_ReturnType extends Awaited<ReturnType<T_Callback>> | undefined = Awaited<ReturnType<T_Callback>> | undefined,
>(
  context: ContextAsync,
  extensionUID: T_ExtensionUID,
  callback: T_Callback,
): Promise<T_ReturnType>
{
  return await maybeUseExtensionAsync<
    T_Callback,
    T_ReturnType
  >(
    context,
    extensionUID,
    callback,
  );
}
