import type { Optional } from "@holypack/core/lib/object/Optional";

import type { ESLintIntegrationPluginCSpellOptions } from "../plugins/cspell/options/ESLintIntegrationPluginCSpellOptions";
import type { ESLintIntegrationPluginGlobalIgnoresOptions } from "../plugins/eslint/global-ignores/options/ESLintIntegrationPluginGlobalIgnoresOptions";
import type { ESLintIntegrationPluginJSOptions } from "../plugins/eslint/js/options/ESLintIntegrationPluginJSOptions";
import type { ESLintIntegrationPluginJSONOptions } from "../plugins/eslint/json/options/ESLintIntegrationPluginJSONOptions";
import type { ESLintIntegrationPluginMarkdownOptions } from "../plugins/eslint/markdown/options/ESLintIntegrationPluginMarkdownOptions";
import type { ESLintIntegrationPluginGlobalsOptions } from "../plugins/globals/options/ESLintIntegrationPluginGlobalsOptions";
import type { ESLintIntegrationPluginImportXOptions } from "../plugins/import-x/options/ESLintIntegrationPluginImportXOptions";
import type { ESLintIntegrationPluginJSDocOptions } from "../plugins/jsdoc/options/ESLintIntegrationPluginJSDocOptions";
import type { ESLintIntegrationPluginNOptions } from "../plugins/n/options/ESLintIntegrationPluginNOptions";
import type { ESLintIntegrationPluginPerfectionistOptions } from "../plugins/perfectionist/options/ESLintIntegrationPluginPerfectionistOptions";
import type { ESLintIntegrationPluginStylisticOptions } from "../plugins/stylistic/options/ESLintIntegrationPluginStylisticOptions";
import type { ESLintIntegrationPluginTypeScriptOptions } from "../plugins/typescript/options/ESLintIntegrationPluginTypeScriptOptions";
import type { ESLintIntegrationPluginYMLOptions } from "../plugins/yml/options/ESLintIntegrationPluginYMLOptions";

export type ESLintIntegrationPluginOptionsMapping = {
  cspell?: Optional<ESLintIntegrationPluginCSpellOptions | false>;
  globals?: Optional<ESLintIntegrationPluginGlobalsOptions | false>;
  ignores?: Optional<ESLintIntegrationPluginGlobalIgnoresOptions | false>;
  importX?: Optional<ESLintIntegrationPluginImportXOptions | false>;
  javascript?: Optional<ESLintIntegrationPluginJSOptions | false>;
  jsdoc?: Optional<ESLintIntegrationPluginJSDocOptions | false>;
  json?: Optional<ESLintIntegrationPluginJSONOptions | false>;
  markdown?: Optional<ESLintIntegrationPluginMarkdownOptions | false>;
  n?: Optional<ESLintIntegrationPluginNOptions | false>;
  perfectionist?: Optional<ESLintIntegrationPluginPerfectionistOptions | false>;
  stylistic?: Optional<ESLintIntegrationPluginStylisticOptions | false>;
  typescript?: Optional<ESLintIntegrationPluginTypeScriptOptions | false>;
  yml?: Optional<ESLintIntegrationPluginYMLOptions | false>;
};
