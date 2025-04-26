import type {
  BabelPostTransformOptionsGenerationHook,
  BabelTransformOptionsGenerationHook,
} from "../../hooks";

declare module "@holypack/core"
{
  interface HookTypeRegistryCustomProperties
  {
    BabelPostTransformOptionsGeneration: BabelPostTransformOptionsGenerationHook;
    BabelTransformOptionsGeneration: BabelTransformOptionsGenerationHook;
  }
}

export {};
