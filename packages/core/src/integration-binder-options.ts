import type { IntegrationBinderLooseErrorFactory } from "./integration-binder-errors";
import { type IntegrationRegistryGetter } from "./integration-registry-getter";

export type IntegrationBinderOptions = {
  looseErrorFactory?: IntegrationBinderLooseErrorFactory | null;
  registryGetter?: IntegrationRegistryGetter | null;
};
