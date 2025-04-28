import type {
  ProcessConfig,
  ProcessResolvedConfig,
  TypeSafeProcessResolvedConfig,
} from "../config";

declare module "../../../config/config"
{
  interface ConfigCustomProperties
  {
    process?: null | ProcessConfig;
  }

  interface ResolvedConfigCustomProperties
  {
    process: ProcessResolvedConfig;
  }

  interface TypeSafeResolvedConfigCustomProperties
  {
    process: Partial<TypeSafeProcessResolvedConfig>;
  }
}

export {};
