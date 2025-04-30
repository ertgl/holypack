import {
  createGenerateJestConfigHook,
  createPostGenerateJestConfigHook,
  type GenerateJestConfigHook,
  HOOK_NAME_JEST_GENERATE_CONFIG,
  HOOK_NAME_JEST_POST_GENERATE_CONFIG,
  type PostGenerateJestConfigHook,
} from "../hooks";

export type JestIntegrationHookSet = (
  & JestIntegrationHookSetBaseProperties
  & JestIntegrationHookSetCustomProperties
);

export type JestIntegrationHookSetBaseProperties = {
  [HOOK_NAME_JEST_GENERATE_CONFIG]: GenerateJestConfigHook;
  [HOOK_NAME_JEST_POST_GENERATE_CONFIG]: PostGenerateJestConfigHook;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface JestIntegrationHookSetCustomProperties
{}

export function createJestIntegrationHookSet(): JestIntegrationHookSet
{
  return {
    [HOOK_NAME_JEST_GENERATE_CONFIG]: createGenerateJestConfigHook(),
    [HOOK_NAME_JEST_POST_GENERATE_CONFIG]: createPostGenerateJestConfigHook(),
  };
}
