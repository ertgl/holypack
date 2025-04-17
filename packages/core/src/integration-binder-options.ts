import type { HookSubscriptionIDGenerator } from "./hook-subscription-id-generator";
import type { IntegrationBinderLooseErrorFactory } from "./integration-binder-errors";
import { type IntegrationRegistryGetter } from "./integration-registry-getter";

export type IntegrationBinderOptions = {
  hookSubscriptionIDGenerator?: HookSubscriptionIDGenerator | null;
  looseErrorFactory?: IntegrationBinderLooseErrorFactory | null;
  registryGetter?: IntegrationRegistryGetter | null;
};
