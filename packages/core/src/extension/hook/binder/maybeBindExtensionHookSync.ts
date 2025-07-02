import type { ContextSync } from "../../../context/ContextSync";
import type { AnyHookSync } from "../../../hook/AnyHookSync";
import type { Extension } from "../../Extension";
import { getExtensionHook } from "../registry/getExtensionHook";

import { bindExtensionHookSync } from "./bindExtensionHookSync";

export function maybeBindExtensionHookSync(
  context: ContextSync,
  extension: Extension,
  hook: AnyHookSync,
): void
{
  const boundHook = getExtensionHook(
    extension,
    hook.name as string,
  );

  if (boundHook != null)
  {
    return;
  }

  bindExtensionHookSync(
    context,
    extension,
    hook,
  );
}
