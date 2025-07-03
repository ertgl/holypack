import type { Optional } from "@holypack/core/lib/object/Optional";

import type { JestIntegrationPluginESLintOptions } from "../plugins/eslint/options/JestIntegrationPluginESLintOptions";

export type JestIntegrationPluginOptionsMapping = {

  eslint?: Optional<false | JestIntegrationPluginESLintOptions>;
};
