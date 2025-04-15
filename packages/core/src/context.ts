import type { ResolvedConfig } from "./config";

export type Context = (
  & ContextBaseProperties
  & ContextCustomProperties
);

export type ContextBaseProperties = {
  config: ResolvedConfig;
  cwd: string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ContextCustomProperties
{}
