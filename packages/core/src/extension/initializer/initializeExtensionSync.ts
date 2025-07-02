import type { ContextSync } from "../../context/ContextSync";
import type { ExtensionSync } from "../ExtensionSync";

export function initializeExtensionSync(
  context: ContextSync,
  extension: ExtensionSync,
): void
{
  if (extension.$initializeSync != null)
  {
    extension.$initializeSync(context);
  }
}
