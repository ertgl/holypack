import type {
  ESLintContext,
  ESLintResolvedContext,
} from "../../context";

declare module "@holypack/core"
{
  interface ContextCustomProperties
  {
    eslint: ESLintResolvedContext;
  }

  interface StrictContextCustomProperties
  {
    eslint?: ESLintContext | null;
  }
}

export {};
