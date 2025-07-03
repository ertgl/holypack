import type { TransformOptions } from "@babel/core";
import type { Config } from "jest";

import { resolvePath } from "@holypack/core/lib/path/resolvePath";

import type { JestContext } from "../../../context/JestContext";
import type { JestIntegrationResolvedOptions } from "../../../options/JestIntegrationResolvedOptions";

export function configureJestTransform(
  jestContext: JestContext,
  options: JestIntegrationResolvedOptions,
  config: Config,
): void
{
  const babelrcRoots = Array.from(
    new Set([
      /* eslint-disable perfectionist/sort-sets */
      jestContext.cwd,
      jestContext.workspace.path,
      jestContext.project.path,
      /* eslint-enable perfectionist/sort-sets */
    ]),
  ).sort(
    (
      a,
      b,
    ) => b.length - a.length,
  );

  // TODO(ertgl): Implement `PackageJSONPropertyFinder` and look for values by falling back to parent workspaces, for supporting limitless depths.

  const moduleType = (
    jestContext.workspace.packageJSON?.type
    || jestContext.project.workspace.packageJSON?.type
    || "module"
  ) as "commonjs" | "module";

  const isModuleTypeCJS = moduleType === "commonjs";
  const isModuleTypeESM = !isModuleTypeCJS;

  const esmRegexp = (
    isModuleTypeESM
      ? /\.[m]?[jt]s[x]?$/.source
      : /\.m[jt]s[x]?$/.source
  );

  const cjsRegexp = (
    isModuleTypeCJS
      ? /\.[c]?[jt]s[x]?$/.source
      : /\.c[jt]s[x]?$/.source
  );

  config.transform = {
    [cjsRegexp]: [
      "babel-jest",
      {
        babelrcRoots,
        // TODO(ertgl): Maybe assert the path specified in `configFile` option of `babel-jest` exists.
        configFile: resolvePath(
          jestContext.workspace.path,
          "babel.config.cjs.mjs",
        ),
        cwd: jestContext.cwd,
        root: jestContext.workspace.path,
        sourceType: "unambiguous",
      } satisfies TransformOptions,
    ],
    [esmRegexp]: [
      "babel-jest",
      {
        babelrcRoots,
        // TODO(ertgl): Maybe assert the path specified in `configFile` option of `babel-jest` exists.
        configFile: resolvePath(
          jestContext.workspace.path,
          "babel.config.esm.mjs",
        ),
        cwd: jestContext.cwd,
        root: jestContext.workspace.path,
        sourceType: "unambiguous",
      } satisfies TransformOptions,
    ],
    ...options.overrides.transform,
  };
}
