// #[cjs(remove)]
import { createRequire } from "node:module";
// #[cjs(remove)]
import { fileURLToPath } from "node:url";

import type {
  PluginItem,
  TransformOptions,
} from "@babel/core";

import type { Context } from "@holypack/core";

import type { Assumptions } from "../../../../../config";
import { PACKAGE_NAME_BABEL_PRESET_TYPESCRIPT } from "../../../constants/packages";
import type { BabelPresetTypeScriptOptions } from "../../../options";
import type { BabelIntegrationTypeScriptPluginOptions } from "../../../plugin/plugin-options";

// #[cjs(remove)]
const __filename = fileURLToPath(import.meta.url);

// #[cjs(remove)]
const require = createRequire(__filename);

export function configureBabelPresetTypeScript(
  context: Context,
  assumptions: Assumptions,
  transformOptions: TransformOptions,
  transformOptionsOverrides?: null | TransformOptions,
  typescriptPluginOptions?: BabelIntegrationTypeScriptPluginOptions | null,
): void
{
  typescriptPluginOptions ??= {};

  let item: null | PluginItem = null;

  const resolvedPackageName = require.resolve(
    PACKAGE_NAME_BABEL_PRESET_TYPESCRIPT,
  );

  if (Array.isArray(transformOptions.presets))
  {
    for (const preset of transformOptions.presets)
    {
      if (
        Array.isArray(preset)
        && (
          preset[0] === PACKAGE_NAME_BABEL_PRESET_TYPESCRIPT
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

  transformOptions.presets ??= [];

  transformOptions.presets.push(
    [
      resolvedPackageName,
      {
        ...typescriptPluginOptions.overrides,
        dts: typescriptPluginOptions.overrides?.dts ?? true,
      } satisfies BabelPresetTypeScriptOptions,
    ],
  );
}
