import type { ContextAsync } from "../../context/ContextAsync";
import type { ExtensionMaybeAsync } from "../ExtensionMaybeAsync";

import { bindExtensionAsync } from "./bindExtensionAsync";

export async function maybeBindExtensionAsync(
  context: ContextAsync,
  extension: ExtensionMaybeAsync,
): Promise<void>
{
  if (!context.extensions.has(extension.$uid))
  {
    await bindExtensionAsync(
      context,
      extension,
    );
  }
}
