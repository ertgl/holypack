import type {
  TypeScriptContext,
  TypeScriptResolvedContext,
} from "../../context";

declare module "@holypack/core"
{
  interface ContextCustomProperties
  {
    typescript?: null | TypeScriptContext;
  }

  interface ResolvedContextCustomProperties
  {
    typescript: TypeScriptResolvedContext;
  }
}

export {};
