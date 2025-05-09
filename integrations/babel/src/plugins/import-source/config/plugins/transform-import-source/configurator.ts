// #[cjs(remove)]
import { createRequire } from "node:module";
// #[cjs(remove)]
import { fileURLToPath } from "node:url";

import type {
  PluginItem,
  TransformOptions,
} from "@babel/core";
import type {
  Options as ImportSourceTransformerPluginOptions,
} from "babel-plugin-transform-import-source";

import type { Context } from "@holypack/core";

import type { Assumptions } from "../../../../../config";
import { PACKAGE_NAME_BABEL_PLUGIN_TRANSFORM_IMPORT_SOURCE } from "../../../constants/packages";
import {
  PATH_REGEX_PATTERN_ANY_JS_EXTENSION_OR_NO_EXTENSION,
  PATH_REGEX_PATTERN_ANY_RELATIVE_PATH,
} from "../../../constants/path-regex-patterns";
import type { BabelIntegrationImportSourcePluginOptions } from "../../../plugin/plugin-options";

// #[cjs(remove)]
const __filename = fileURLToPath(import.meta.url);

// #[cjs(remove)]
const require = createRequire(__filename);

export function configureBabelPluginTransformImportSource(
  context: Context,
  assumptions: Assumptions,
  transformOptions: TransformOptions,
  transformOptionsOverrides?: null | TransformOptions,
  importSourcePluginOptions?: BabelIntegrationImportSourcePluginOptions | null,
): void
{
  importSourcePluginOptions ??= {};

  let item: null | PluginItem = null;

  const resolvedPackageName = require.resolve(
    PACKAGE_NAME_BABEL_PLUGIN_TRANSFORM_IMPORT_SOURCE,
  );

  if (Array.isArray(transformOptions.plugins))
  {
    for (const preset of transformOptions.plugins)
    {
      if (
        Array.isArray(preset)
        && (
          preset[0] === PACKAGE_NAME_BABEL_PLUGIN_TRANSFORM_IMPORT_SOURCE
          || preset[0] === resolvedPackageName
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

  const targetExtension = (
    importSourcePluginOptions.targetExtension
    ?? (
      assumptions.build.target.isLegacy
        ? ".cjs"
        : ".mjs"
    )
  );

  const importSourceTransformerPluginOptions = {
    ...importSourcePluginOptions.overrides,
    transform: {
      ...importSourcePluginOptions.overrides?.transform,
      rules: [
        ...importSourcePluginOptions.overrides?.transform?.rules ?? [],
      ],
    },
  } satisfies ImportSourceTransformerPluginOptions;

  if (!assumptions.env.isTest)
  {
    importSourceTransformerPluginOptions.transform.rules.unshift(
      {
        find: PATH_REGEX_PATTERN_ANY_JS_EXTENSION_OR_NO_EXTENSION,
        replace: targetExtension,
        resolveIndex: true,
        test: PATH_REGEX_PATTERN_ANY_RELATIVE_PATH,
      },
    );
  }

  transformOptions.plugins.push(
    [
      resolvedPackageName,
      importSourceTransformerPluginOptions,
    ],
  );
}
