import type {
  ESLintConfigGenerationHook,
  ESLintPostConfigGenerationHook,
} from "../../hooks";

declare module "@holypack/core"
{
  interface HookTypeRegistryCustomProperties
  {
    ESLintConfigGeneration: ESLintConfigGenerationHook;
    ESLintPostConfigGeneration: ESLintPostConfigGenerationHook;
  }
}

export {};
