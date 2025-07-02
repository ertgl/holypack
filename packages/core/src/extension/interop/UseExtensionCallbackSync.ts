import type { Extension } from "../Extension";

export type UseExtensionCallbackSync<
  T_Extension extends Extension = Extension,
> = (
  extension: T_Extension,
) => unknown;
