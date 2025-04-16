import type { Integration } from "./integration";

export const ERROR_INTEGRATION_IS_ALREADY_BOUND = "IntegrationIsAlreadyBoundError";

export const ERROR_INTEGRATION_NAME_IS_NOT_DEFINED = "IntegrationNameIsNotDefinedError";

export class IntegrationIsAlreadyBoundError extends Error
{
  integration: Integration;

  constructor(
    integration: Integration,
  )
  {
    super("Integration is already bound");
    this.name = ERROR_INTEGRATION_IS_ALREADY_BOUND;
    this.integration = integration;
  }
}

export class IntegrationNameIsNotDefinedError extends Error
{
  integration: Integration;

  constructor(
    integration: Integration,
  )
  {
    super("Integration name is not defined");
    this.name = ERROR_INTEGRATION_NAME_IS_NOT_DEFINED;
    this.integration = integration;
  }
}
