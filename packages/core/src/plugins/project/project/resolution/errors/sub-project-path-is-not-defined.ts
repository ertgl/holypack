export const ERROR_SUB_PROJECT_PATH_IS_NOT_DEFINED = "SubProjectPathIsNotDefinedError";

export class SubProjectPathIsNotDefinedError extends Error
{
  constructor()
  {
    super("Sub project path is not defined");
    this.name = ERROR_SUB_PROJECT_PATH_IS_NOT_DEFINED;
  }
}
