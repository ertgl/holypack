import type { PluginLoaderLooseErrorFactory } from "./plugin-loader-loose-error-factory";
import type { PluginRegistryGetter } from "./plugin-registry-getter";

export type PluginLoaderOptions = {
  looseErrorFactory?: null | PluginLoaderLooseErrorFactory;
  registryGetter?: null | PluginRegistryGetter;
};
