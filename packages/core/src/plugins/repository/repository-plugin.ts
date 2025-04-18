import type { Config } from "../../config";
import type { Context } from "../../context";
import type { Plugin } from "../../plugin-system";

import { RepositoryPluginAPI } from "./repository-plugin-api";

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
    context: Context,
    config: Config,
  ): Promise<void>
  {
    let rootPath = config.repository?.path;

    if (!rootPath)
    {
      rootPath = await this.api.findRootPath({
        cwd: context.cwd,
      });
    }

    context.repository = {
      path: rootPath,
    };
  }
}

export function createRepositoryPlugin(): RepositoryPlugin
{
  return new RepositoryPlugin();
}
