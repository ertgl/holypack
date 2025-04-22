export type ProcessConfig = (
  & ProcessConfigBaseProperties
  & ProcessConfigCustomProperties
);

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type ProcessConfigBaseProperties = {};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ProcessConfigCustomProperties
{}

export type ProcessResolvedConfig = (
  & ProcessResolvedConfigBaseProperties
  & ProcessResolvedConfigCustomProperties
);

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type ProcessResolvedConfigBaseProperties = {};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ProcessResolvedConfigCustomProperties
{}
