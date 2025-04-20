import { IntegrationNotFoundError } from "./errors";

export type IntegrationLoaderLooseErrorFactory = {
  createNotFoundError: (
    integrationName: string,
  ) => Error;
};

export function createIntegrationLoaderLooseErrorFactory(): IntegrationLoaderLooseErrorFactory
{
  return {
    createNotFoundError: (
      integrationName,
    ) =>
    {
      return new IntegrationNotFoundError(integrationName);
    },
  };
}
