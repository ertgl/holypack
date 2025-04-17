import type { Integration } from "../integration";
import type { Plugin } from "../plugin-system";

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
