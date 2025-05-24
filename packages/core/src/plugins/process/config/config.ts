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

export type StrictProcessResolvedConfig = (
  & ProcessResolvedConfigBaseProperties
  & {
    [key in keyof ProcessResolvedConfigCustomProperties]?: (
      key extends keyof StrictProcessResolvedConfigCustomProperties
        ? StrictProcessResolvedConfigCustomProperties[key]
        : ProcessResolvedConfigCustomProperties[key]
    );
  }
);

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface StrictProcessResolvedConfigCustomProperties
{}
