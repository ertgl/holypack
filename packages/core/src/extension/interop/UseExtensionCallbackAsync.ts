import type { Extension } from "../Extension";

export type UseExtensionCallbackAsync<
  T_Extension extends Extension = Extension,
> = (
  extension: T_Extension,
) => Promise<unknown>;
