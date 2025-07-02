import type { ExtensionLoadingSpec } from "./ExtensionLoadingSpec";

export function isExtensionLoadingSpec<
  T extends ExtensionLoadingSpec = ExtensionLoadingSpec,
>(
  value: unknown,
): value is T
{
  if (typeof value === "string")
  {
    return true;
  }

  if (typeof value === "function")
  {
    return true;
  }

  if (Array.isArray(value))
  {
    if (value.length === 1)
    {
      return (
        typeof value[0] === "string"
        || typeof value[0] === "function"
      );
    }

    if (value.length === 2)
    {
      return (
        (
          typeof value[0] === "string"
          || typeof value[0] === "function"
        )
        && (
          typeof value[1] === "object"
          && !Array.isArray(value[1])
        )
      );
    }
  }

  return false;
}
