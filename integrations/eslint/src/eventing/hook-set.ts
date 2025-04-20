import {
  createESLintConfigGenerationHook,
  createESLintPostConfigGenerationHook,
  type ESLintConfigGenerationHook,
  type ESLintPostConfigGenerationHook,
} from "../hooks";

export type ESLintIntegrationHookSet = (
  & ESLintIntegrationHookSetBaseProperties
  & ESLintIntegrationHookSetCustomProperties
);

export type ESLintIntegrationHookSetBaseProperties = {
  configGeneration: ESLintConfigGenerationHook;
  postConfigGeneration: ESLintPostConfigGenerationHook;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ESLintIntegrationHookSetCustomProperties
{}

export function createESLintIntegrationHookSet(): ESLintIntegrationHookSet
{
  return {
    configGeneration: createESLintConfigGenerationHook(),
    postConfigGeneration: createESLintPostConfigGenerationHook(),
  };
}
