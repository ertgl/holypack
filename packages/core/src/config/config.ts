import type { Plugin } from "../extension";
import type { Integration } from "../integration";
import type { EnforceOrderedStrictness } from "../lib/dts";

export type Config = (
  & ConfigBaseProperties
  & ConfigCustomProperties
);

export type ConfigBaseProperties = {
  integrations?: (false | Integration | null | undefined)[] | null;
  plugins?: (false | null | Plugin | undefined)[] | null;
};

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
export interface ResolvedConfigCustomProperties
{};

export type StrictConfig = EnforceOrderedStrictness<[
  ConfigBaseProperties,
  Partial<ConfigCustomProperties>,
]>;

export type StrictResolvedConfig = EnforceOrderedStrictness<[
  ResolvedConfigBaseProperties,
  ResolvedConfigCustomProperties,
  Partial<StrictResolvedConfigCustomProperties>,
]>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface StrictResolvedConfigCustomProperties
{}
