// #[cjs(remove)]
import { createRequire } from "node:module";
// #[cjs(remove)]
import { fileURLToPath } from "node:url";

import type {
  PluginItem,
  TransformOptions,
} from "@babel/core";
import type { Options as BabelPluginImportSourceTransformerOptions } from "babel-plugin-transform-import-source";

import { suppressErrorSync } from "@holypack/core/lib/runtime/suppressErrorSync";

import { MODULE_FORMAT_CJS } from "../../../compilation/MODULE_FORMAT_CJS";
import type { BabelContext } from "../../../context/BabelContext";
import type { BabelIntegrationResolvedOptions } from "../../../options/BabelIntegrationResolvedOptions";
import { PACKAGE_NAME_BABEL_PLUGIN_TRANSFORM_IMPORT_SOURCE } from "../constants/packages/PACKAGE_NAME_BABEL_PLUGIN_TRANSFORM_IMPORT_SOURCE";
import { REGEXP_ANY_RELATIVE_PATH } from "../constants/regexp/REGEXP_ANY_RELATIVE_PATH";
import { REGEXP_PATH_WITH_ANY_JS_EXTENSION_OR_NO_EXTENSION } from "../constants/regexp/REGEXP_PATH_WITH_ANY_JS_EXTENSION_OR_NO_EXTENSION";
import type { BabelIntegrationPluginImportSourceTransformerResolvedOptions } from "../options/BabelIntegrationPluginImportSourceTransformerResolvedOptions";

// #[cjs(remove)]
const __filename = fileURLToPath(import.meta.url);

// #[cjs(remove)]
const require = createRequire(__filename);

export function configureBabelPluginImportSourceTransformer(
  babelContext: BabelContext,
  babelIntegrationOptions: BabelIntegrationResolvedOptions,
  pluginImportSourceTransformerOptions: BabelIntegrationPluginImportSourceTransformerResolvedOptions,
  transformOptions: TransformOptions,
): void
{
  if (babelContext.env.isTest)
  {
    return;
  }

  const resolvedPackageName = suppressErrorSync(
    require.resolve.bind(require),
    PACKAGE_NAME_BABEL_PLUGIN_TRANSFORM_IMPORT_SOURCE,
  );

  if (!resolvedPackageName)
  {
    return;
  }

  let item: null | PluginItem = null;

  if (Array.isArray(transformOptions.plugins))
  {
    for (const preset of transformOptions.plugins)
    {
      if (
        (
          typeof preset === "string"
          && (
            preset === PACKAGE_NAME_BABEL_PLUGIN_TRANSFORM_IMPORT_SOURCE
            || preset === resolvedPackageName
          )
        )
        || (
          Array.isArray(preset)
          && (
            preset[0] === PACKAGE_NAME_BABEL_PLUGIN_TRANSFORM_IMPORT_SOURCE
            || preset[0] === resolvedPackageName
          )
        )
      )
      {
        item = preset;
        break;
      }
    }
  }

  if (item != null)
  {
    return;
  }

  transformOptions.plugins ??= [];

  const importSourceTransformerPluginOptions = {
    ...pluginImportSourceTransformerOptions.overrides,
    transform: {
      ...pluginImportSourceTransformerOptions.overrides.transform,
      rules: [
        ...pluginImportSourceTransformerOptions.overrides.transform?.rules ?? [],
      ],
    },
  } satisfies BabelPluginImportSourceTransformerOptions;

  const targetExtension = (
    babelContext.build.target.format === MODULE_FORMAT_CJS
      ? ".cjs"
      : ".mjs"
  );

  importSourceTransformerPluginOptions.transform.rules.unshift(
    {
      find: REGEXP_PATH_WITH_ANY_JS_EXTENSION_OR_NO_EXTENSION,
      replace: targetExtension,
      resolveIndex: {
        extensions: [
          ".cjs",
          ".cts",
          ".js",
          ".mjs",
          ".mts",
          ".ts",
        ],
        fallback: "index",
        prioritize: true,
      },
      test: REGEXP_ANY_RELATIVE_PATH,
    },
  );

  transformOptions.plugins.push(
    [
      resolvedPackageName,
      importSourceTransformerPluginOptions,
    ],
  );
}
