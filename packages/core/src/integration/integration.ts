import type {
  Plugin,
  PluginName,
} from "../plugin-system";

export interface Integration extends Plugin
{
  readonly name: IntegrationName;
}

export type IntegrationName = PluginName;
