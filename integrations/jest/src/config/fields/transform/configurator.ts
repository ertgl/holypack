import { resolve as resolvePath } from "node:path";

import type { TransformOptions } from "@babel/core";
import type { Config } from "jest";

import type { Context } from "@holypack/core";

import type { ConfigPreset } from "../../presets";

export function configureJestTransform(
  context: Context,
  config: Config,
  preset: ConfigPreset,
  overrides?: Config | null,
): void
{
  config.transform = {
    [/\.[cm]?[jt]s[x]?$/.source]: [
      "babel-jest",
      {
        babelrcRoots: Array.from(
          new Set([
            context.project.path,
            preset.paths.root,
          ]),
        ).sort(
          (a, b) => b.length - a.length,
        ),
        // TODO(ertgl): Maybe assert the path specified in `configFile` option of `babel-jest` exists.
        configFile: resolvePath(
          preset.paths.root,
          "babel.config.jest.mjs",
        ),
        cwd: context.cwd,
        root: preset.paths.root,
        sourceType: "unambiguous",
      } satisfies TransformOptions,
    ],
    ...overrides?.transform,
  };
}
