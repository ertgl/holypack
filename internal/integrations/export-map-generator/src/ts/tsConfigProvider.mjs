import { lstatSync } from "node:fs";

import defineConfig from "export-map-generator/config";
import {
  joinPaths,
  resolvePath,
} from "export-map-generator/path";
import cjs from "export-map-generator/presets/cjs";
import dts from "export-map-generator/presets/dts";
import esm from "export-map-generator/presets/esm";
import json from "export-map-generator/presets/json";
import packageJSON from "export-map-generator/presets/package-json";
import standard from "export-map-generator/presets/standard";

const SRC_DIRECTORY_PATH = "src";

const DIST_CJS_DIRECTORY_PATH = joinPaths(
  "dist",
  "cjs",
);

const DIST_ESM_DIRECTORY_PATH = joinPaths(
  "dist",
  "esm",
);

const DIST_TYPES_DIRECTORY_PATH = joinPaths(
  "dist",
  "types",
);

export const tsConfigProvider = defineConfig(
  (context) =>
  {
    const distCJSDirectoryAbsolutePath = resolvePath(
      context.cwd,
      DIST_CJS_DIRECTORY_PATH,
    );

    const distCJSDirectoryStats = lstatSync(
      distCJSDirectoryAbsolutePath,
      {
        throwIfNoEntry: false,
      },
    );

    const distCJSDirectoryExists = (
      distCJSDirectoryStats?.isDirectory()
      ?? false
    );

    const distESMDirectoryAbsolutePath = resolvePath(
      context.cwd,
      DIST_ESM_DIRECTORY_PATH,
    );

    const distESMDirectoryStats = lstatSync(
      distESMDirectoryAbsolutePath,
      {
        throwIfNoEntry: false,
      },
    );

    const distESMDirectoryExists = (
      distESMDirectoryStats?.isDirectory()
      ?? false
    );

    const distTypesDirectoryAbsolutePath = resolvePath(
      context.cwd,
      DIST_TYPES_DIRECTORY_PATH,
    );

    const distTypesDirectoryStats = lstatSync(
      distTypesDirectoryAbsolutePath,
      {
        throwIfNoEntry: false,
      },
    );

    const distTypesDirectoryExists = (
      distTypesDirectoryStats?.isDirectory()
      ?? false
    );

    return {
      presets: [
        standard({
          updater: {
            safe: true,
          },
        }),

        (
          distTypesDirectoryExists
            ? dts({
                src: {
                  extension: ".ts",
                },
              })
            : null
        ),

        (
          distCJSDirectoryExists
            ? cjs({
                src: {
                  extension: ".ts",
                },
              })
            : cjs({
                dist: {
                  extension: ".ts",
                  path: SRC_DIRECTORY_PATH,
                },
                src: {
                  extension: ".ts",
                },
                virtual: {
                  extensions: [
                    "",
                    ".ts",
                  ],
                },
              })
        ),

        (
          distESMDirectoryExists
            ? esm({
                src: {
                  extension: ".ts",
                },
              })
            : esm({
                dist: {
                  extension: ".ts",
                  path: SRC_DIRECTORY_PATH,
                },
                src: {
                  extension: ".ts",
                },
                virtual: {
                  extensions: [
                    "",
                    ".ts",
                  ],
                },
              })
        ),

        (
          distESMDirectoryExists
            ? json({
                conditions: [
                  "import",
                  "default",
                ],
                dist: {
                  path: DIST_ESM_DIRECTORY_PATH,
                },
              })
            : json({
                dist: {
                  path: SRC_DIRECTORY_PATH,
                },
              })
        ),

        (
          distCJSDirectoryExists
            ? json({
                conditions: [
                  "require",
                  "default",
                ],
                dist: {
                  path: DIST_CJS_DIRECTORY_PATH,
                },
              })
            : json({
                dist: {
                  path: SRC_DIRECTORY_PATH,
                },
              })
        ),

        packageJSON(),
      ],
    };
  },
);
