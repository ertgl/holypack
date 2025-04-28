import type { TypeSafeContext } from "@holypack/core";

import {
  findTSConfigRootDirectoryPath,
  type TSConfigRootDirectoryPathFinderOptions,
} from "../tsconfig-root-directory-path-finder";

import type { TypeScriptIntegration } from "./integration";

export class TypeScriptIntegrationAPI
{
  integration: TypeScriptIntegration;

  constructor(
    integration: TypeScriptIntegration,
  )
  {
    this.integration = integration;
  }

  async findTSConfigRootDirectoryPath(
    context: TypeSafeContext,
    options?: null | TSConfigRootDirectoryPathFinderOptions,
  ): Promise<string>
  {
    const cwd = options?.cwd ?? context.cwd;

    return await findTSConfigRootDirectoryPath({
      ...options,
      cwd,
    });
  }
}
