import type { Optional } from "@holypack/core/lib/object/Optional";

import { MODULE_FORMAT_DEFAULT } from "../../build/module/format/MODULE_FORMAT_DEFAULT";

import type { BabelConfiguratorOptions } from "./BabelConfiguratorOptions";
import type { BabelConfiguratorResolvedOptions } from "./BabelConfiguratorResolvedOptions";

export function resolveBabelConfiguratorOptions(
  options?: Optional<BabelConfiguratorOptions>,
): BabelConfiguratorResolvedOptions
{
  options ??= {};

  return {
    format: options.format ?? MODULE_FORMAT_DEFAULT,
    overrides: options.overrides ?? {},
  };
}
