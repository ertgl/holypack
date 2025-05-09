import type {
  GenerateBabelTransformOptionsHook,
  HOOK_NAME_BABEL_GENERATE_TRANSFORM_OPTIONS,
  HOOK_NAME_BABEL_POST_GENERATE_TRANSFORM_OPTIONS,
  PostGenerateBabelTransformOptionsHook,
} from "../integration/hooks";

declare module "@holypack/core"
{
  interface HookTypeRegistryCustomProperties
  {
    [HOOK_NAME_BABEL_GENERATE_TRANSFORM_OPTIONS]: GenerateBabelTransformOptionsHook;
    [HOOK_NAME_BABEL_POST_GENERATE_TRANSFORM_OPTIONS]: PostGenerateBabelTransformOptionsHook;
  }
}

export {};
