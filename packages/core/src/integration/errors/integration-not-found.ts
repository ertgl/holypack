export const ERROR_INTEGRATION_NOT_FOUND = "IntegrationNotFoundError";

export class IntegrationNotFoundError extends Error
{
  integrationName: string;

  constructor(
    integrationName: string,
  )
  {
    super("Integration name is not defined");
    this.name = ERROR_INTEGRATION_NOT_FOUND;
    this.integrationName = integrationName;
  }
}
