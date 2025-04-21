// TODO(ertgl): Automate workspace-related configs for ESLint. When `WorkspacePlugin` is ready.

import { createRequire } from "node:module";
import {
  dirname,
  relative as getRelativePath,
  join as joinPaths,
  resolve as resolvePath,
} from "node:path";
import { fileURLToPath } from "node:url";

import createHolypackPlugin from "@holypack/eslint-plugin";

import packageJSON from "./package.json" with { type: "json" };

/**
 * @import { type Linter } from "eslint";
 * @import { type default as FastGlobModule } from "fast-glob";
 */

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const require = createRequire(__filename);

/**
 * @type {FastGlobModule}
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const fastGlob = require("fast-glob");
const glob = fastGlob.glob.bind(fastGlob);

const workspaceDirPaths = await glob(
  packageJSON.workspaces,
  {
    absolute: true,
    cwd: __dirname,
    onlyDirectories: true,
  },
);

const holypack = await createHolypackPlugin({
  context: {
    cwd: __dirname,
  },
});

/**
 * @type {Linter.Config[]}
 */
const ESLINT_CONFIG = [
  ...holypack.configs.recommended,

  {
    ignores: [
      resolvePath(__dirname, ".yarn"),
      resolvePath(__dirname, "node_modules"),
    ].map(
      (absoluteIgnorePath) =>
      {
        return joinPaths(
          getRelativePath(__dirname, absoluteIgnorePath),
          "**",
          "*",
        );
      },
    ),
  },

  {
    ignores: workspaceDirPaths.flatMap(
      (workspaceDirPath) =>
      {
        return [
          resolvePath(workspaceDirPath, "dist"),
          resolvePath(workspaceDirPath, "node_modules"),
        ].map(
          (absoluteIgnorePath) =>
          {
            return joinPaths(
              getRelativePath(__dirname, absoluteIgnorePath),
              "**",
              "*",
            );
          },
        );
      },
    ),
  },
];

export default ESLINT_CONFIG;
