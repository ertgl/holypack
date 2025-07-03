import { HolypackError } from "../../../error/HolypackError";

import { ERROR_CURRENT_PROJECT_ROOT_PATH_IS_NOT_FOUND } from "./ERROR_CURRENT_PROJECT_ROOT_PATH_IS_NOT_FOUND";

export class CurrentProjectRootPathIsNotFoundError extends HolypackError
{
  constructor()
  {
    super(
      ERROR_CURRENT_PROJECT_ROOT_PATH_IS_NOT_FOUND,
      "Current project root path is not found",
    );
  }
}
