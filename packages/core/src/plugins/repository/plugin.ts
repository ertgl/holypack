import type { Config } from "../../config";
import type { Context } from "../../context";
import type { Plugin } from "../../plugin";

export const PLUGIN_NAME_REPOSITORY = "@holypack/core:Repository";

export class RepositoryPlugin implements Plugin
{
  name = PLUGIN_NAME_REPOSITORY;

  resolveConfig(
    context: Context,
    config: Config,
  ): void
  {
    // TODO(ertgl): Implement repository resolution.
    context.repository = {
      path: config.repository?.path || context.cwd,
    };
  }
}

export function createRepositoryPlugin(): RepositoryPlugin
{
  return new RepositoryPlugin();
}
