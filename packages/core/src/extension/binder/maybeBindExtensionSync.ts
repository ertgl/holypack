import type { ContextSync } from "../../context/ContextSync";
import type { ExtensionSync } from "../ExtensionSync";

import { bindExtensionSync } from "./bindExtensionSync";

export function maybeBindExtensionSync(
  context: ContextSync,
  extension: ExtensionSync,
): void
{
  if (!context.extensions.has(extension.$uid))
  {
    bindExtensionSync(
      context,
      extension,
    );
  }
}
