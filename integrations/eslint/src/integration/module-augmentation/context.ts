import type {
  ESLintContext,
  ESLintResolvedContext,
} from "../../context";

declare module "@holypack/core"
{
  interface ContextCustomProperties
  {
    eslint?: ESLintContext | null;
  }

  interface ResolvedContextCustomProperties
  {
    eslint: ESLintResolvedContext;
  }
}

export {};
