import type { Optional } from "../../lib/object/Optional";
import type { ContextAsync } from "../ContextAsync";
import type { ContextSync } from "../ContextSync";

import type { ContextResolutionOptions } from "./ContextResolutionOptions";
import type { ContextResolutionOptionsAsync } from "./ContextResolutionOptionsAsync";
import type { ContextResolutionOptionsAsyncOrSync } from "./ContextResolutionOptionsAsyncOrSync";
import type { ContextResolutionOptionsStrictAsync } from "./ContextResolutionOptionsStrictAsync";
import type { ContextResolutionOptionsStrictSync } from "./ContextResolutionOptionsStrictSync";
import { resolveContextAsync } from "./resolveContextAsync";
import { resolveContextSync } from "./resolveContextSync";

export function resolveContext(
  options: ContextResolutionOptionsStrictSync
): ContextSync;
export function resolveContext(
  options?: Optional<(
    | ContextResolutionOptionsAsync
    | ContextResolutionOptionsStrictAsync
  )>,
): Promise<ContextAsync>;
export function resolveContext(
  options: ContextResolutionOptionsAsyncOrSync
): ContextSync | Promise<ContextAsync>;
export function resolveContext(
  options?: Optional<ContextResolutionOptions | ContextResolutionOptionsAsyncOrSync>,
): ContextSync | Promise<ContextAsync>
{
  if (options == null)
  {
    return resolveContextAsync();
  }

  if (options.sync)
  {
    return resolveContextSync(options as ContextResolutionOptionsStrictSync);
  }

  return resolveContextAsync(options as ContextResolutionOptionsAsync);
}
