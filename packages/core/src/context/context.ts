import type {
  ResolvedConfig,
  StrictResolvedConfig,
} from "../config";
import type {
  HookSet,
  StrictHookSet,
} from "../eventing";
import type { PluginMap } from "../extension";
import type { IntegrationMap } from "../integration";
import type { EnforceOrderedStrictness } from "../lib/dts";

export type Context = (
  & ContextBaseProperties
  & ContextCustomProperties
);

export type ContextBaseProperties = (
  & ContextCommonBaseProperties
  & {
    config: ResolvedConfig;
    hooks: HookSet;
  }
);

export type ContextCommonBaseProperties = {
  cwd: string;
  integrations: IntegrationMap;
  plugins: PluginMap;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ContextCustomProperties
{}

export type StrictContext = EnforceOrderedStrictness<[
  ContextCommonBaseProperties,
  {
    config: StrictResolvedConfig;
    hooks: StrictHookSet;
  },
  ContextCustomProperties,
  StrictContextCustomProperties,
]>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface StrictContextCustomProperties
{}
