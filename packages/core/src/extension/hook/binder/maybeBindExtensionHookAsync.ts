import type { ContextAsync } from "../../../context/ContextAsync";
import type { AnyHook } from "../../../hook/AnyHook";
import type { Extension } from "../../Extension";
import { getExtensionHook } from "../registry/getExtensionHook";

import { bindExtensionHookAsync } from "./bindExtensionHookAsync";

export async function maybeBindExtensionHookAsync(
  context: ContextAsync,
  extension: Extension,
  hook: AnyHook,
): Promise<void>
{
  const boundHook = getExtensionHook(
    extension,
    hook.name as string,
  );

  if (boundHook != null)
  {
    return;
  }

  await bindExtensionHookAsync(
    context,
    extension,
    hook,
  );
}
