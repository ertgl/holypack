import type { ResolvedConfig } from "./config";
import type { HookSet } from "./hook-set";
import type { IntegrationMap } from "./integration-map";

export type Context = (
  & ContextBaseProperties
  & ContextCustomProperties
);

export type ContextBaseProperties = {
  config: ResolvedConfig;
  cwd: string;
  hooks: HookSet;
  integrations: IntegrationMap;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ContextCustomProperties
{}
