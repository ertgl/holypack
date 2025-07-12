import {
  copyFileSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { dirname } from "node:path";

import { transformSync } from "@babel/core";

import { mapSrcPathToDist } from "@holypack/internal-dev/build/output/mapSrcPathToDist.mjs";
import { getSourceFileDirents } from "@holypack/internal-dev/build/source/getSourceFileDirents.mjs";
import { MODULE_FORMAT_TO_FILE_EXTENSION_MAPPING } from "@holypack/internal-dev/build/target/MODULE_FORMAT_TO_FILE_EXTENSION_MAPPING.mjs";
import { getDirentFullPath } from "@holypack/internal-dev/lib/fs/dirent/getDirentFullPath.mjs";

import { enableRuntimeFreeFileReporterPlugin } from "../plugins/report-runtime-free-files/enableRuntimeFreeFileReporterPlugin.mjs";
import { isBabelFileResultRuntimeFree } from "../plugins/report-runtime-free-files/isBabelFileResultRuntimeFree.mjs";

import { resolveBuilderOptions } from "./options/resolveBuilderOptions.mjs";

/**
 * @import {
 *   type ConfigFunction,
 *   type TransformOptions,
 * } from "@babel/core";
 * @import { type BuildContext } from "@holypack/internal-dev/build/context/BuildContext.mjs";
 * @import { type BuilderOptions } from "./options/BuilderOptions.mjs";
 * @import { type BuildStats } from "./stats/BuildStats.mjs";
 */

/**
 * @param {BuildContext} context
 * @param {BuilderOptions | null} [options]
 * @returns {Promise<BuildStats>}
 * @throws
 */
export async function build(
  context,
  options,
)
{
  const {
    configFilePath,
    exclude,
    format,
  } = resolveBuilderOptions(
    context,
    options,
  );

  const {
    dist: distDirectoryPath,
    src: srcDirectoryPath,
  } = context.workspace.paths;

  const outputFileExtension = MODULE_FORMAT_TO_FILE_EXTENSION_MAPPING[format];

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (outputFileExtension == null)
  {
    throw new TypeError(`Missing output file extension for format: ${format}`);
  }

  /**
   * @type {ConfigFunction | TransformOptions | { default: TransformOptions }}
   */
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  let baseTransformOptions = await import(configFilePath);

  if ("default" in baseTransformOptions)
  {
    baseTransformOptions = baseTransformOptions.default;
  }

  if (typeof baseTransformOptions === "function")
  {
    baseTransformOptions = {
      presets: [
        baseTransformOptions,
      ],
    };
  }

  if (baseTransformOptions.sourceMaps)
  {
    throw new TypeError("The custom Babel builder does not support linking source-maps.");
  }

  const sourceFileDirents = getSourceFileDirents(
    srcDirectoryPath,
    {
      exclude,
    },
  );

  let compiledFilesCount = 0;
  let runtimeFreeFilesCount = 0;

  for (const sourceFileDirent of sourceFileDirents)
  {
    const sourceFilePath = getDirentFullPath(sourceFileDirent);

    if (sourceFilePath.endsWith(".json"))
    {
      const outputFilePath = mapSrcPathToDist(
        srcDirectoryPath,
        distDirectoryPath,
        sourceFilePath,
      );

      mkdirSync(
        dirname(outputFilePath),
        {
          recursive: true,
        },
      );

      copyFileSync(
        sourceFilePath,
        outputFilePath,
      );

      continue;
    }

    const outputFilePath = mapSrcPathToDist(
      srcDirectoryPath,
      distDirectoryPath,
      sourceFilePath,
      outputFileExtension,
    );

    const sourceCode = readFileSync(
      sourceFilePath,
      "utf8",
    );

    /**
     * @satisfies {TransformOptions}
     */
    const transformOptions = {
      ...baseTransformOptions,
      babelrc: false,
      browserslistConfigFile: false,
      configFile: false,
      filename: sourceFilePath,
    };

    enableRuntimeFreeFileReporterPlugin(transformOptions);

    const babelFileResult = transformSync(
      sourceCode,
      transformOptions,
    );

    if (babelFileResult?.code == null)
    {
      continue;
    }

    compiledFilesCount++;

    if (isBabelFileResultRuntimeFree(babelFileResult))
    {
      runtimeFreeFilesCount++;
      continue;
    }

    mkdirSync(
      dirname(outputFilePath),
      {
        recursive: true,
      },
    );

    writeFileSync(
      outputFilePath,
      babelFileResult.code,
      "utf8",
    );
  }

  return {
    compiledFilesCount,
    runtimeFreeFilesCount,
  };
}
