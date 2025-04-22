import type {
  ProcessConfig,
  ProcessResolvedConfig,
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
}

export {};
