import type { HookSubscriptionIDGenerator } from "./hook-subscription-id-generator";
import type { PluginBinderLooseErrorFactory } from "./plugin-binder-errors";
import { type PluginRegistryGetter } from "./plugin-registry-getter";

export type PluginBinderOptions = {
  hookSubscriptionIDGenerator?: HookSubscriptionIDGenerator | null;
  looseErrorFactory?: null | PluginBinderLooseErrorFactory;
  registryGetter?: null | PluginRegistryGetter;
};
