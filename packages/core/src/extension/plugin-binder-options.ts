import type { HookSubscriptionIDGenerator } from "../eventing";

import type { PluginBinderLooseErrorFactory } from "./plugin-binder-loose-error-factory";
import type { PluginRegistryGetter } from "./plugin-registry-getter";

export type PluginBinderOptions = {
  hookSubscriptionIDGenerator?: HookSubscriptionIDGenerator | null;
  looseErrorFactory?: null | PluginBinderLooseErrorFactory;
  registryGetter?: null | PluginRegistryGetter;
};
