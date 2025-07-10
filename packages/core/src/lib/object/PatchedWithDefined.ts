import type { ExtractDefinedKeys } from "./ExtractDefinedKeys";

export type PatchedWithDefined<
  T_Initials,
  T_Patches,
  T_DefinedPatchKey extends ExtractDefinedKeys<T_Patches> = ExtractDefinedKeys<T_Patches>,
> = (
  & Omit<T_Initials, T_DefinedPatchKey>
  & Pick<T_Patches, T_DefinedPatchKey>
);
