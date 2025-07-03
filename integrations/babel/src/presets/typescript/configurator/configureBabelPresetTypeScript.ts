// #[cjs(remove)]
import { createRequire } from "node:module";
// #[cjs(remove)]
import { fileURLToPath } from "node:url";

import type {
  PluginItem,
  TransformOptions,
} from "@babel/core";

import { suppressErrorSync } from "@holypack/core/lib/runtime/suppressErrorSync";

import type { BabelContext } from "../../../context/BabelContext";
import type { BabelIntegrationResolvedOptions } from "../../../options/BabelIntegrationResolvedOptions";
import { PACKAGE_NAME_BABEL_PRESET_TYPESCRIPT } from "../constants/PACKAGE_NAME_BABEL_PRESET_TYPESCRIPT";
import type { BabelIntegrationPresetTypeScriptResolvedOptions } from "../options/BabelIntegrationPresetTypeScriptResolvedOptions";
import type { BabelPresetTypeScriptOptions } from "../options/BabelPresetTypeScriptOptions";

// #[cjs(remove)]
const __filename = fileURLToPath(import.meta.url);

// #[cjs(remove)]
const require = createRequire(__filename);

export function configureBabelPresetTypeScript(
  babelContext: BabelContext,
  options: BabelIntegrationResolvedOptions,
  presetTypeScriptOptions: BabelIntegrationPresetTypeScriptResolvedOptions,
  transformOptions: TransformOptions,
): void
{
  const resolvedPackageName = suppressErrorSync(
    require.resolve.bind(require),
    PACKAGE_NAME_BABEL_PRESET_TYPESCRIPT,
  );

  if (!resolvedPackageName)
  {
    return;
  }

  let item: null | PluginItem = null;

  if (Array.isArray(transformOptions.presets))
  {
    for (const preset of transformOptions.presets)
    {
      if (
        (
          typeof preset === "string"
          && (
            preset === PACKAGE_NAME_BABEL_PRESET_TYPESCRIPT
            || preset === resolvedPackageName
          )
        )
        || (
          Array.isArray(preset)
          && (
            preset[0] === PACKAGE_NAME_BABEL_PRESET_TYPESCRIPT
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

  transformOptions.presets ??= [];

  transformOptions.presets.push(
    [
      resolvedPackageName,
      {
        ...presetTypeScriptOptions.overrides,
        dts: presetTypeScriptOptions.overrides.dts ?? true,
      } satisfies BabelPresetTypeScriptOptions,
    ],
  );
}
