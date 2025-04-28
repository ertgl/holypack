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

export type TypeSafeProcessResolvedConfig = (
  & ProcessResolvedConfigBaseProperties
  & {
    [key in keyof ProcessResolvedConfigCustomProperties]?: (
      key extends keyof TypeSafeProcessResolvedConfigCustomProperties
        ? TypeSafeProcessResolvedConfigCustomProperties[key]
        : ProcessResolvedConfigCustomProperties[key]
    );
  }
);

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TypeSafeProcessResolvedConfigCustomProperties
{}
