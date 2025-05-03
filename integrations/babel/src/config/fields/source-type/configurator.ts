import type { TransformOptions } from "@babel/core";

import type { Context } from "@holypack/core";

import type { Assumptions } from "../../assumptions";

export function configureBabelSourceType(
  context: Context,
  assumptions: Assumptions,
  transformOptions: TransformOptions,
  overrides?: null | TransformOptions,
): void
{
  transformOptions.sourceType = "unambiguous";
}
