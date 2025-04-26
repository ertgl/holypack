import {
  relative as getRelativePath,
  join as joinPaths,
  resolve as resolvePath,
} from "node:path";

import type { Linter } from "eslint";

import type { ResolvedContext } from "@holypack/core";

import type { ESLintIntegrationIgnoresPlugin } from "./plugin";
import type { ESLintIntegrationIgnoresPluginOptions } from "./plugin-options";
import { resolveESLintIntegrationIgnoresPluginOptions } from "./plugin-options-resolver";

export class ESLintIntegrationIgnoresPluginAPI
{
  plugin: ESLintIntegrationIgnoresPlugin;

  constructor(
    plugin: ESLintIntegrationIgnoresPlugin,
  )
  {
    this.plugin = plugin;
  }

  addESLintConfig(
    context: ResolvedContext,
    configs: Linter.Config[],
    options?: boolean | ESLintIntegrationIgnoresPluginOptions | null,
  ): void
  {
    const resolvedOptions = resolveESLintIntegrationIgnoresPluginOptions(
      context.cwd,
      options,
    );

    if (resolvedOptions === false)
    {
      return;
    }

    configs.push(
      {
        ignores: [
          resolvePath(context.project.path, ".yarn"),
          resolvePath(context.project.path, "node_modules"),
        ].map(
          (absoluteIgnorePath) =>
          {
            return joinPaths(
              getRelativePath(context.cwd, absoluteIgnorePath),
              "**",
              "*",
            );
          },
        ),
      },

      {
        ignores: Array.from(
          context.workspaces.values().flatMap(
            (workspace) =>
            {
              return [
                resolvePath(workspace.path, "dist"),
                resolvePath(workspace.path, "node_modules"),
              ].map(
                (absoluteIgnorePath) =>
                {
                  return joinPaths(
                    getRelativePath(context.cwd, absoluteIgnorePath),
                    "**",
                    "*",
                  );
                },
              );
            },
          ),
        ),
      },
    );
  }
}
