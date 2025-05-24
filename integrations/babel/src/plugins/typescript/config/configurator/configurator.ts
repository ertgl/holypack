import type { TransformOptions } from "@babel/core";

import type { Context } from "@holypack/core";

import type { Assumptions } from "../../../../config";
import type { BabelIntegrationTypeScriptPluginOptions } from "../../plugin/plugin-options";
import { configureBabelPresetTypeScript } from "../presets/typescript";

export function configureBabelTypeScript(
  context: Context,
  assumptions: Assumptions,
  transformOptions: TransformOptions,
  overrides?: null | TransformOptions,
  typescriptPluginOptions?: BabelIntegrationTypeScriptPluginOptions | null,
): void
{
  configureBabelPresetTypeScript(
    context,
    assumptions,
    transformOptions,
    overrides,
    typescriptPluginOptions,
  );
}
