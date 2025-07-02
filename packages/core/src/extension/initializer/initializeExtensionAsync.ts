import type { ContextAsync } from "../../context/ContextAsync";
import { maybeAwait } from "../../lib/promise/maybeAwait";
import type { ExtensionMaybeAsync } from "../ExtensionMaybeAsync";

export async function initializeExtensionAsync(
  context: ContextAsync,
  extension: ExtensionMaybeAsync,
): Promise<void>
{
  if (extension.$initialize != null)
  {
    await maybeAwait(extension.$initialize(context));
  }
}
