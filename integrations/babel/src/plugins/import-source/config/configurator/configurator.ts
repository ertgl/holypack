import type { TransformOptions } from "@babel/core";

import type { Context } from "@holypack/core";

import type { Assumptions } from "../../../../config";
import type { BabelIntegrationImportSourcePluginOptions } from "../../plugin";
import { configureBabelPluginTransformImportSource } from "../plugins/transform-import-source";

export function configureBabelImportSources(
  context: Context,
  assumptions: Assumptions,
  transformOptions: TransformOptions,
  overrides?: null | TransformOptions,
  importSourcePluginOptions?: BabelIntegrationImportSourcePluginOptions | null,
): void
{
  configureBabelPluginTransformImportSource(
    context,
    assumptions,
    transformOptions,
    overrides,
    importSourcePluginOptions,
  );
}
