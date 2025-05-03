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

  interface StrictProcessResolvedConfigCustomProperties
  {
    warningMonitor: Partial<ProcessWarningMonitorResolvedConfig>;
  }
}

export {};
