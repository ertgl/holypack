import type { Optional } from "@holypack/core/lib/object/Optional";

import { BabelPreset } from "./BabelPreset";
import type { BabelPresetOptions } from "./options/BabelPresetOptions";

export function createBabelPreset(
  options?: Optional<BabelPresetOptions>,
): BabelPreset
{
  return new BabelPreset(options);
}
