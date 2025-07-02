import type { TransformOptions } from "@babel/core";

import { ModuleFormat } from "../compilation/ModuleFormat";

export type BabelIntegrationResolvedOptions = {
  format: ModuleFormat;
  overrides: TransformOptions;
};
