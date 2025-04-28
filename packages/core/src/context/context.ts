import type {
  ResolvedConfig,
  TypeSafeResolvedConfig,
} from "../config";
import type {
  HookSet,
  TypeSafeHookSet,
} from "../eventing";
import type { PluginMap } from "../extension";
import type { IntegrationMap } from "../integration";

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

export type TypeSafeContext = (
  & ContextCommonBaseProperties
  & {
    [key in keyof ContextCustomProperties]?: (
      key extends keyof TypeSafeContextCustomProperties
        ? TypeSafeContextCustomProperties[key]
        : ContextCustomProperties[key]
    );
  }
  & {
    config: TypeSafeResolvedConfig;
    hooks: TypeSafeHookSet;
  }
);

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TypeSafeContextCustomProperties
{}
