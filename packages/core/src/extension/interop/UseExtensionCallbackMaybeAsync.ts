import type { MaybePromise } from "../../lib/promise/MaybePromise";
import type { Extension } from "../Extension";

export type UseExtensionCallbackMaybeAsync<
  T_Extension extends Extension = Extension,
> = (
  extension: T_Extension,
) => MaybePromise<unknown>;
