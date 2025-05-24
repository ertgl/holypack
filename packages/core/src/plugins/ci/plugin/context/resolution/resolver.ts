import { isCI } from "../../../utils/ci-env-detector";
import type { CIContext } from "../context";

import type { CIContextResolutionOptions } from "./options";

export function resolveCIContext(
  options?: CIContextResolutionOptions | null,
): CIContext
{
  return {
    isEnabled: options?.config?.ci ?? isCI(),
  };
}
