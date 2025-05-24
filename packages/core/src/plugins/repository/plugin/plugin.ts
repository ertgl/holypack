import type { Config } from "../../../config";
import type { StrictContext } from "../../../context";
import type { Plugin } from "../../../extension";
import { PLUGIN_NAME_REPOSITORY } from "../plugin-metadata";

import { RepositoryPluginAPI } from "./plugin-api";

export class RepositoryPlugin implements Plugin
{
  api: RepositoryPluginAPI;

  name = PLUGIN_NAME_REPOSITORY;

  constructor()
  {
    this.api = new RepositoryPluginAPI(this);
  }

  async resolveConfig(
    context: StrictContext,
    config: Config,
  ): Promise<void>
  {
    context.repository = await this.api.resolve({
      cwd: context.cwd,
      repository: config.repository,
    });
  }
}

export function createRepositoryPlugin(): RepositoryPlugin
{
  return new RepositoryPlugin();
}
