import type { Config } from "jest";

import type { JestIntegrationPluginOptionsMapping } from "./JestIntegrationPluginOptionsMapping";

export type JestIntegrationResolvedOptions = {
  overrides: Config;
  plugins: JestIntegrationPluginOptionsMapping;
};
