import { HolypackError } from "../../../error/HolypackError";

import { ERROR_CURRENT_WORKSPACE_ROOT_PATH_IS_NOT_FOUND } from "./ERROR_CURRENT_WORKSPACE_ROOT_PATH_IS_NOT_FOUND";

export class CurrentWorkspaceRootPathIsNotFoundError extends HolypackError
{
  constructor()
  {
    super(
      ERROR_CURRENT_WORKSPACE_ROOT_PATH_IS_NOT_FOUND,
      "Current workspace root path is not found",
    );
  }
}
