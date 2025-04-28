import type { Config } from "../../config";
import type { TypeSafeContext } from "../../context";
import type { Plugin } from "../../extension";

import { RepositoryPluginAPI } from "./plugin-api";

export const PLUGIN_NAME_REPOSITORY = "@holypack/core:Repository";

export class RepositoryPlugin implements Plugin
{
  api: RepositoryPluginAPI;

  name = PLUGIN_NAME_REPOSITORY;

  constructor()
  {
    this.api = new RepositoryPluginAPI(this);
  }

  async resolveConfig(
    context: TypeSafeContext,
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
