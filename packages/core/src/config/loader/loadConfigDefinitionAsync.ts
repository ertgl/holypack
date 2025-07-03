import { basename } from "node:path";
import { promisify } from "node:util";

import { DEFAULT_BUFFER_ENCODING } from "../../lib/buffer/DEFAULT_BUFFER_ENCODING";
import { getPathExtensionToDecoderMappingMaybeAsync } from "../../lib/codec/utils/decoder-by-path-extension/getPathExtensionToDecoderMappingMaybeAsync";
import { resolveFileSystemFunctionAsync } from "../../lib/fs/resolveFileSystemFunctionAsync";
import { getValueByKeyPath } from "../../lib/object/getValueByKeyPath";
import { maybePatchDefined } from "../../lib/object/maybePatchDefined";
import type { Optional } from "../../lib/object/Optional";
import { absolutifyPath } from "../../lib/path/absolutifyPath";
import { extractPathExtension } from "../../lib/path/extractPathExtension";
import type { PathLike } from "../../lib/path/PathLike";
import { resolveCWD } from "../../lib/process/cwd/resolveCWD";
import { maybeAwait } from "../../lib/promise/maybeAwait";
import type { PathExtensionToConfigDefinitionDecoderMappingMaybeAsync } from "../decoder/PathExtensionToConfigDefinitionDecoderMappingMaybeAsync";
import type { ConfigDefinitionAsync } from "../definition/ConfigDefinitionAsync";
import { getConfigPackageJSONPropertyKeyPath } from "../explorer/getConfigPackageJSONPropertyKeyPath";
import type { ConfigDefinitionProviderMaybeAsync } from "../provider/ConfigDefinitionProviderMaybeAsync";

import type { ConfigDefinitionLoaderOptionsAsync } from "./ConfigDefinitionLoaderOptionsAsync";

export async function loadConfigDefinitionAsync(
  filePathLike: Optional<PathLike>,
  options?: Optional<ConfigDefinitionLoaderOptionsAsync>,
): Promise<Optional<ConfigDefinitionAsync | ConfigDefinitionProviderMaybeAsync>>
{
  if (filePathLike == null)
  {
    return null;
  }

  options ??= {};

  const filePath = absolutifyPath(
    resolveCWD.bind(null, options.cwd),
    filePathLike,
  );

  const pathExtensionToDecoderMapping = maybePatchDefined(
    getPathExtensionToDecoderMappingMaybeAsync() as Partial<PathExtensionToConfigDefinitionDecoderMappingMaybeAsync>,
    options.pathExtensionToDecoderMapping,
  );

  const pathExtension = extractPathExtension(
    filePath,
    {
      candidates: Object.keys(pathExtensionToDecoderMapping),
      fallbackToExtname: true,
    },
  );

  const decoderFunction = pathExtensionToDecoderMapping[pathExtension];

  if (decoderFunction != null)
  {
    const decoderOptions = maybePatchDefined(
      {
        encoding: DEFAULT_BUFFER_ENCODING,
      },
      options.decoderOptions,
    );

    const readFile = await resolveFileSystemFunctionAsync(
      "readFile",
      options.fs,
    );

    const readFilePromisified = promisify(readFile);

    const content = await readFilePromisified(
      filePath,
      decoderOptions.encoding,
    );

    const contentDecoded = await maybeAwait(
      decoderFunction(
        content,
        decoderOptions,
      ),
    );

    if (pathExtension === ".json")
    {
      const fileName = basename(filePath);

      if (fileName === "package.json")
      {
        return getValueByKeyPath(
          contentDecoded,
          (
            options.packageJSONPropertyKeyPath
            ?? getConfigPackageJSONPropertyKeyPath()
          ),
        );
      }
    }

    return contentDecoded;
  }

  const module = await import(
    filePath,
  ) as {
    default?: Optional<ConfigDefinitionAsync | ConfigDefinitionProviderMaybeAsync>;
  };

  return module.default;
}
