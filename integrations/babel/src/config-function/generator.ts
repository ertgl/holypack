import type {
  ConfigAPI,
  ConfigFunction,
  TransformOptions,
} from "@babel/core";

import type { StrictContext } from "@holypack/core";

import type { BabelIntegrationHookSet } from "../eventing";

export async function generateBabelConfigFunction(
  context: StrictContext,
  hooks: BabelIntegrationHookSet,
): Promise<ConfigFunction>
{
  const transformOptions: TransformOptions = {};

  await hooks.transformOptionsGeneration.promise(context, transformOptions);
  await hooks.postTransformOptionsGeneration.promise(transformOptions);

  return function generateBabelTransformOptions(
    api: ConfigAPI,
  ): TransformOptions
  {
    // TODO(ertgl): Invalidate Babel cache if current environment is test.

    return transformOptions;
  };
}
