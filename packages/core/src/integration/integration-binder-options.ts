import type { HookSubscriptionIDGenerator } from "../hook-system";

import type { IntegrationBinderLooseErrorFactory } from "./integration-binder-loose-error-factory";
import type { IntegrationRegistryGetter } from "./integration-registry-getter";

export type IntegrationBinderOptions = {
  hookSubscriptionIDGenerator?: HookSubscriptionIDGenerator | null;
  looseErrorFactory?: IntegrationBinderLooseErrorFactory | null;
  registryGetter?: IntegrationRegistryGetter | null;
};
