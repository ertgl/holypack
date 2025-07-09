import type { TransformOptions } from "@babel/core";

import { ModuleFormat } from "../build/module/format/ModuleFormat";

export type BabelIntegrationResolvedOptions = {
  format: ModuleFormat;
  overrides: TransformOptions;
};
