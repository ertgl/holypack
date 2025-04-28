import type {
  ProcessConfig,
  ProcessResolvedConfig,
  StrictProcessResolvedConfig,
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

  interface StrictResolvedConfigCustomProperties
  {
    process: Partial<StrictProcessResolvedConfig>;
  }
}

export {};
