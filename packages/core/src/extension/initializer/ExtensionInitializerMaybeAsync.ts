import type { ContextAsync } from "../../context/ContextAsync";
import type { MaybePromise } from "../../lib/promise/MaybePromise";

export type ExtensionInitializerMaybeAsync = (
  context: ContextAsync,
) => MaybePromise<void>;
