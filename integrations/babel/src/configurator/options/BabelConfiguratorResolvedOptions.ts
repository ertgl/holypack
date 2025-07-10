import type { TransformOptions } from "@babel/core";

import type { ModuleFormat } from "../../build/module/format/ModuleFormat";

export type BabelConfiguratorResolvedOptions = {
  format: ModuleFormat;
  overrides: TransformOptions;
};
