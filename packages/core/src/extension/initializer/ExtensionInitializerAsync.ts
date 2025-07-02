import type { ContextAsync } from "../../context/ContextAsync";

export type ExtensionInitializerAsync = (
  context: ContextAsync,
) => Promise<void>;
