import type { TransformOptions } from "@babel/core";

import type { BabelContext } from "../context/BabelContext";

import { configureFieldSourceType } from "./fields/configureFieldSourceType";
import type { BabelConfiguratorResolvedOptions } from "./options/BabelConfiguratorResolvedOptions";

export function generateBabelTransformOptions(
  babelContext: BabelContext,
  options: BabelConfiguratorResolvedOptions,
)
{
  const transformOptions: TransformOptions = {};

  configureFieldSourceType(
    babelContext,
    options,
    transformOptions,
  );

  return transformOptions;
}
