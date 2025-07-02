import type { ContextAsync } from "../../../context/ContextAsync";

export type SystemExtensionsBinderAsync = (
  context: ContextAsync,
) => Promise<unknown>;
