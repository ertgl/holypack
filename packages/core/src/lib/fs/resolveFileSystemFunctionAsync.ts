import type { Optional } from "../object/Optional";
import type { StrictPartial } from "../object/StrictPartial";

import type { CustomFileSystem } from "./CustomFileSystem";

export async function resolveFileSystemFunctionAsync<
  T_FS extends StrictPartial<CustomFileSystem> = CustomFileSystem,
  T_FunctionName extends keyof CustomFileSystem = keyof CustomFileSystem,
  T_Function extends CustomFileSystem[T_FunctionName] = CustomFileSystem[T_FunctionName],
>(
  functionName: T_FunctionName,
  fs?: Optional<T_FS>,
): Promise<T_Function>
{
  const fsFunction = fs?.[functionName];

  if (fsFunction != null)
  {
    return fsFunction as T_Function;
  }

  const {
    [functionName]: superFSFunction,
  } = await import("node:fs");

  return superFSFunction as T_Function;
}
