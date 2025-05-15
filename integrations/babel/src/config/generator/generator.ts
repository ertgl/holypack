import type { TransformOptions } from "@babel/core";

import type { Context } from "@holypack/core";

import type { BabelIntegrationHookSet } from "../../integration/eventing";
import {
  HOOK_NAME_BABEL_GENERATE_TRANSFORM_OPTIONS,
  HOOK_NAME_BABEL_POST_GENERATE_TRANSFORM_OPTIONS,
} from "../../integration/hooks";
import { createAssumptions } from "../assumptions";
import { configureBabelSourceType } from "../fields/source-type";

import type { BabelTransformOptionsGeneratorOptions } from "./options";

export async function generateBabelTransformOptions(
  context: Context,
  hooks: BabelIntegrationHookSet,
  options?: BabelTransformOptionsGeneratorOptions | null,
): Promise<TransformOptions>
{
  options ??= {};

  const overrides: TransformOptions = options.overrides ?? {};

  const transformOptions: TransformOptions = {};

  const assumptions = createAssumptions(
    context,
    overrides,
  );

  configureBabelSourceType(
    context,
    assumptions,
    transformOptions,
    overrides,
  );

  await hooks[HOOK_NAME_BABEL_GENERATE_TRANSFORM_OPTIONS].promise(
    context,
    assumptions,
    transformOptions,
    overrides,
  );

  await hooks[HOOK_NAME_BABEL_POST_GENERATE_TRANSFORM_OPTIONS].promise(transformOptions);

  return transformOptions;
}
