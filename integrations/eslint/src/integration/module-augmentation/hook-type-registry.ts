import type { ESLintIntegrationHookSet } from "../../eventing";

declare module "@holypack/core"
{
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface HookTypeRegistryCustomProperties extends ESLintIntegrationHookSet
  {}
}

export {};
