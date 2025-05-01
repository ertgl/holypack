import type {
  TypeScriptContext,
  TypeScriptResolvedContext,
} from "../../context";

declare module "@holypack/core"
{
  interface ContextCustomProperties
  {
    typescript: TypeScriptResolvedContext;
  }

  interface StrictContextCustomProperties
  {
    typescript?: null | TypeScriptContext;
  }
}

export {};
