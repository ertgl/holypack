import type { IntegrationLoaderLooseErrorFactory } from "./integration-loader-loose-error-factory";
import type { IntegrationRegistryGetter } from "./integration-registry-getter";

export type IntegrationLoaderOptions = {
  looseErrorFactory?: IntegrationLoaderLooseErrorFactory | null;
  registryGetter?: IntegrationRegistryGetter | null;
};
