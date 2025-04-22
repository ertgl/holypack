export const ERROR_MODULE_NOT_FOUND = "ModuleNotFoundError";

export class ModuleNotFoundError extends Error
{
  moduleName: string;

  constructor(
    moduleName: string,
  )
  {
    super(`Module not found: ${moduleName}`);
    this.name = ERROR_MODULE_NOT_FOUND;
    this.moduleName = moduleName;
  }
}
