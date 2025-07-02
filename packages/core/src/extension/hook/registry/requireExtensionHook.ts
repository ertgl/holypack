import type { AnyHook } from "../../../hook/AnyHook";
import type { HookUID } from "../../../hook/uid/HookUID";
import type { Extension } from "../../Extension";

import { ExtensionHookIsNotFoundError } from "./errors/ExtensionHookIsNotFoundError";
import { getExtensionHook } from "./getExtensionHook";

export function requireExtensionHook<
  T_Hook extends AnyHook,
>(
  extension: Extension,
  hookUID: HookUID,
): T_Hook
{
  const hook = getExtensionHook<T_Hook>(
    extension,
    hookUID,
  );

  if (hook == null)
  {
    throw new ExtensionHookIsNotFoundError(
      extension,
      hookUID,
    );
  }

  return hook;
}
