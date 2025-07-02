import type { AnyHook } from "../../../hook/AnyHook";
import type { HookUID } from "../../../hook/uid/HookUID";
import type { Extension } from "../../Extension";

export function getExtensionHook<
  T_Hook extends AnyHook,
>(
  extension: Extension,
  hookUID: HookUID,
): T_Hook | undefined
{
  if (extension.$hooks == null)
  {
    return undefined;
  }

  return extension.$hooks.get(hookUID) as T_Hook | undefined;
}
