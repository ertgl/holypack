import type { TransformOptions } from "@babel/core";

import type { Optional } from "@holypack/core/lib/object/Optional";

import type { ModuleFormat } from "../../build/module/format/ModuleFormat";

export type BabelConfiguratorOptions = {
  format?: Optional<ModuleFormat>;
  overrides?: Optional<TransformOptions>;
};
