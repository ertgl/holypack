// #[cjs(remove)]
import { createRequire } from "node:module";
import { basename } from "node:path";
// #[cjs(remove)]
import { fileURLToPath } from "node:url";

import { DEFAULT_BUFFER_ENCODING } from "../../lib/buffer/DEFAULT_BUFFER_ENCODING";
import { getPathExtensionToDecoderMappingSync } from "../../lib/codec/utils/decoder-by-path-extension/getPathExtensionToDecoderMappingSync";
import { resolveFileSystemFunctionSync } from "../../lib/fs/resolveFileSystemFunctionSync";
import { requireDefaultExport } from "../../lib/module/requireDefaultExport";
import { getValueByKeyPath } from "../../lib/object/getValueByKeyPath";
import { maybePatchDefined } from "../../lib/object/maybePatchDefined";
import type { Optional } from "../../lib/object/Optional";
import { absolutifyPath } from "../../lib/path/absolutifyPath";
import { extractPathExtension } from "../../lib/path/extractPathExtension";
import type { PathLike } from "../../lib/path/PathLike";
import { resolveCWD } from "../../lib/process/cwd/resolveCWD";
import type { PathExtensionToConfigDefinitionDecoderMappingSync } from "../decoder/PathExtensionToConfigDefinitionDecoderMappingSync";
import type { ConfigDefinitionSync } from "../definition/ConfigDefinitionSync";
import { getConfigPackageJSONPropertyKeyPath } from "../explorer/getConfigPackageJSONPropertyKeyPath";
import type { ConfigDefinitionProviderSync } from "../provider/ConfigDefinitionProviderSync";

import type { ConfigDefinitionLoaderOptionsSync } from "./ConfigDefinitionLoaderOptionsSync";

// #[cjs(remove)]
const __filename = fileURLToPath(import.meta.url);

// #[cjs(remove)]
const require = createRequire(__filename);

export function loadConfigDefinitionSync(
  filePathLike: Optional<PathLike>,
  options?: Optional<ConfigDefinitionLoaderOptionsSync>,
): Optional<ConfigDefinitionProviderSync | ConfigDefinitionSync>
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
    getPathExtensionToDecoderMappingSync() as Partial<PathExtensionToConfigDefinitionDecoderMappingSync>,
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

    const readFileSync = resolveFileSystemFunctionSync(
      "readFileSync",
      options.fs,
    );

    const content = readFileSync(
      filePath,
      decoderOptions.encoding,
    );

    const contentDecoded = decoderFunction(
      content,
      decoderOptions,
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

  return (
    requireDefaultExport(
      require,
      filePath,
    )
    ?? null
  ) as Optional<ConfigDefinitionProviderSync | ConfigDefinitionSync>;
}
