import {
  createGenerateBabelTransformOptionsHook,
  createPostGenerateBabelTransformOptionsHook,
  type GenerateBabelTransformOptionsHook,
  HOOK_NAME_BABEL_GENERATE_TRANSFORM_OPTIONS,
  HOOK_NAME_BABEL_POST_GENERATE_TRANSFORM_OPTIONS,
  type PostGenerateBabelTransformOptionsHook,
} from "../hooks";

export type BabelIntegrationHookSet = (
  & BabelIntegrationHookSetBaseProperties
  & BabelIntegrationHookSetCustomProperties
);

export type BabelIntegrationHookSetBaseProperties = {
  [HOOK_NAME_BABEL_GENERATE_TRANSFORM_OPTIONS]: GenerateBabelTransformOptionsHook;
  [HOOK_NAME_BABEL_POST_GENERATE_TRANSFORM_OPTIONS]: PostGenerateBabelTransformOptionsHook;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BabelIntegrationHookSetCustomProperties
{}

export function createBabelIntegrationHookSet(): BabelIntegrationHookSet
{
  return {
    [HOOK_NAME_BABEL_GENERATE_TRANSFORM_OPTIONS]: createGenerateBabelTransformOptionsHook(),
    [HOOK_NAME_BABEL_POST_GENERATE_TRANSFORM_OPTIONS]: createPostGenerateBabelTransformOptionsHook(),
  };
}
