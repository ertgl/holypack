import type { PluginBinderLooseErrorFactory } from "./plugin-binder-errors";
import { type PluginRegistryGetter } from "./plugin-registry-getter";

export type PluginBinderOptions = {
  looseErrorFactory?: null | PluginBinderLooseErrorFactory;
  registryGetter?: null | PluginRegistryGetter;
};
