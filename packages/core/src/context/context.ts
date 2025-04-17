import type { ResolvedConfig } from "../config";
import type { HookSet } from "../hook-system";
import type { IntegrationMap } from "../integration";
import type { PluginMap } from "../plugin-system";

export type Context = (
  & ContextBaseProperties
  & ContextCustomProperties
);

export type ContextBaseProperties = {
  config: ResolvedConfig;
  cwd: string;
  hooks: HookSet;
  integrations: IntegrationMap;
  plugins: PluginMap;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ContextCustomProperties
{}

export type ResolvedContext = (
  & ResolvedContextBaseProperties
  & ResolvedContextCustomProperties
);

export type ResolvedContextBaseProperties = (
  & ContextBaseProperties
);

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ResolvedContextCustomProperties
{}
