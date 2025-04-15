export type Config = (
  & ConfigBaseProperties
  & ConfigCustomProperties
);

// TODO(ertgl): Narrow down the type of ConfigBaseProperties.
export type ConfigBaseProperties = object;

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
