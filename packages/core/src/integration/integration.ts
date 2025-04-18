import type {
  Plugin,
  PluginName,
} from "../extension";

export interface Integration extends Plugin
{
  readonly name: IntegrationName;
}

export type IntegrationName = PluginName;
