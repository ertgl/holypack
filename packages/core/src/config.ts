export type Config = (
  & ConfigBaseProperties
  & ConfigCustomProperties
);

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type ConfigBaseProperties = {};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ConfigCustomProperties
{};

export type ResolvedConfig = (
  & ResolvedConfigBaseProperties
  & ResolvedConfigCustomProperties
);

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type ResolvedConfigBaseProperties = {};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ResolvedConfigCustomProperties {};
