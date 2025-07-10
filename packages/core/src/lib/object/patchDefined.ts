import type { AnyKey } from "./AnyKey";
import type { PatchedWithDefined } from "./PatchedWithDefined";

export function patchDefined<
  T_Initials,
  T_Patches,
  T_ReturnType extends PatchedWithDefined<T_Initials, T_Patches> = PatchedWithDefined<T_Initials, T_Patches>,
>(
  initials: T_Initials,
  patches: T_Patches,
): T_ReturnType
{
  const result: Record<AnyKey, unknown> = {};

  const keys = new Set(
    Object.keys(
      initials as Record<AnyKey, unknown>,
    ),
  ).union(
    new Set(
      Object.keys(
        patches as Record<AnyKey, unknown>,
      ),
    ),
  );

  for (const key of keys)
  {
    const initialValue = (initials as Record<AnyKey, unknown>)[key];
    const patchValue = (patches as Record<AnyKey, unknown>)[key];

    result[key] = patchValue ?? initialValue;
  }

  return result as T_ReturnType;
}
