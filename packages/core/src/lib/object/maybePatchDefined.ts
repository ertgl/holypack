import type { Optional } from "./Optional";
import { patchDefined } from "./patchDefined";
import type { PatchedWithDefined } from "./PatchedWithDefined";

export function maybePatchDefined<
  T_Initials,
  T_Patches,
  T_ReturnType extends PatchedWithDefined<T_Initials, T_Patches> = PatchedWithDefined<T_Initials, T_Patches>,
>(
  initials: Optional<T_Initials>,
  patches: Optional<T_Patches>,
): T_ReturnType
{
  if (initials == null && patches == null)
  {
    return {} as unknown as T_ReturnType;
  }

  if (initials == null)
  {
    return patches as unknown as T_ReturnType;
  }

  if (patches == null)
  {
    return initials as unknown as T_ReturnType;
  }

  return patchDefined<T_Initials, T_Patches, T_ReturnType>(
    initials,
    patches,
  );
}
