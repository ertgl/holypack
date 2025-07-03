import type { TransformOptions } from "@babel/core";

import type { BabelContext } from "../context/BabelContext";
import type { BabelIntegrationResolvedOptions } from "../options/BabelIntegrationResolvedOptions";

import { configureFieldSourceType } from "./fields/configureFieldSourceType";

export function generateBabelTransformOptions(
  babelContext: BabelContext,
  options: BabelIntegrationResolvedOptions,
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
