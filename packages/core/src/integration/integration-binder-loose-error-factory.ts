import {
  IntegrationIsAlreadyBoundError,
  IntegrationNameIsNotDefinedError,
} from "./errors";
import type { Integration } from "./integration";

export type IntegrationBinderLooseErrorFactory = {
  createAlreadyBoundError: (
    integration: Integration,
  ) => Error;

  createNameIsNotDefinedError: (
    integration: Integration,
  ) => Error;
};

export function createIntegrationBinderLooseErrorFactory(): IntegrationBinderLooseErrorFactory
{
  return {
    createAlreadyBoundError: (
      integration,
    ) =>
    {
      return new IntegrationIsAlreadyBoundError(integration);
    },
    createNameIsNotDefinedError: (
      integration,
    ) =>
    {
      return new IntegrationNameIsNotDefinedError(integration);
    },
  };
}
