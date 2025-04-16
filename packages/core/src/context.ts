import type { ResolvedConfig } from "./config";
import type { HookSet } from "./hook-set";
import type { IntegrationMap } from "./integration-map";
import type { PluginMap } from "./plugin-map";

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
