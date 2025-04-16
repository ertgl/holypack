import type {
  Plugin,
  PluginName,
} from "./plugin";

export interface Integration extends Plugin
{
  readonly name: IntegrationName;
}

export type IntegrationName = PluginName;
