import {
  createGenerateESLintConfigsHook,
  createPostGenerateESLintConfigsHook,
  type GenerateESLintConfigsHook,
  HOOK_NAME_ESLINT_GENERATE_CONFIGS,
  HOOK_NAME_ESLINT_POST_GENERATE_CONFIGS,
  type PostGenerateESLintConfigsHook,
} from "../hooks";

export type ESLintIntegrationHookSet = (
  & ESLintIntegrationHookSetBaseProperties
  & ESLintIntegrationHookSetCustomProperties
);

export type ESLintIntegrationHookSetBaseProperties = {
  [HOOK_NAME_ESLINT_GENERATE_CONFIGS]: GenerateESLintConfigsHook;
  [HOOK_NAME_ESLINT_POST_GENERATE_CONFIGS]: PostGenerateESLintConfigsHook;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ESLintIntegrationHookSetCustomProperties
{}

export function createESLintIntegrationHookSet(): ESLintIntegrationHookSet
{
  return {
    [HOOK_NAME_ESLINT_GENERATE_CONFIGS]: createGenerateESLintConfigsHook(),
    [HOOK_NAME_ESLINT_POST_GENERATE_CONFIGS]: createPostGenerateESLintConfigsHook(),
  };
}
