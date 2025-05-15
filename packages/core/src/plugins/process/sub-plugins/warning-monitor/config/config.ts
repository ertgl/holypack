export type ProcessWarningMonitorConfig = (
  & ProcessWarningMonitorConfigBaseProperties
  & ProcessWarningMonitorConfigCustomProperties
);

export type ProcessWarningMonitorConfigBaseProperties = {
  emit?: boolean | null;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ProcessWarningMonitorConfigCustomProperties
{}

export type ProcessWarningMonitorResolvedConfig = (
  & ProcessWarningMonitorResolvedConfigBaseProperties
  & ProcessWarningMonitorResolvedConfigCustomProperties
);

export type ProcessWarningMonitorResolvedConfigBaseProperties = {
  emit: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ProcessWarningMonitorResolvedConfigCustomProperties
{}
