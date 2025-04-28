import type {
  ProcessWarningMonitorConfig,
  ProcessWarningMonitorResolvedConfig,
} from "../config";

declare module "../../../config"
{
  interface ProcessConfigCustomProperties
  {
    warningMonitor?: null | ProcessWarningMonitorConfig;
  }

  interface ProcessResolvedConfigCustomProperties
  {
    warningMonitor: ProcessWarningMonitorResolvedConfig;
  }

  interface TypeSafeProcessResolvedConfigCustomProperties
  {
    warningMonitor: Partial<ProcessWarningMonitorResolvedConfig>;
  }
}

export {};
