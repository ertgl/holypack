import {
  parse,
  relative,
  resolve,
} from "node:path";

/**
 * @param {string} srcDirectoryPath
 * @param {string} distDirectoryPath
 * @param {string} sourceFilePath
 * @param {string | null} [outputFileExtension]
 * @returns {string}
 */
export function mapSrcPathToDist(
  srcDirectoryPath,
  distDirectoryPath,
  sourceFilePath,
  outputFileExtension,
)
{
  const srcRelativeFilePath = relative(
    srcDirectoryPath,
    sourceFilePath,
  );

  const srcRelativeFileParsedPath = parse(srcRelativeFilePath);

  outputFileExtension ??= srcRelativeFileParsedPath.ext;

  return resolve(
    distDirectoryPath,
    srcRelativeFileParsedPath.dir,
    srcRelativeFileParsedPath.name + outputFileExtension,
  );
}
