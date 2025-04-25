import {
  type BabelPostTransformOptionsGenerationHook,
  type BabelTransformOptionsGenerationHook,
  createBabelPostTransformOptionsGenerationHook,
  createBabelTransformOptionsGenerationHook,
} from "../hooks";

export type BabelIntegrationHookSet = (
  & BabelIntegrationHookSetBaseProperties
  & BabelIntegrationHookSetCustomProperties
);

export type BabelIntegrationHookSetBaseProperties = {
  postTransformOptionsGeneration: BabelPostTransformOptionsGenerationHook;
  transformOptionsGeneration: BabelTransformOptionsGenerationHook;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BabelIntegrationHookSetCustomProperties
{}

export function createBabelIntegrationHookSet(): BabelIntegrationHookSet
{
  return {
    postTransformOptionsGeneration: createBabelPostTransformOptionsGenerationHook(),
    transformOptionsGeneration: createBabelTransformOptionsGenerationHook(),
  };
}
