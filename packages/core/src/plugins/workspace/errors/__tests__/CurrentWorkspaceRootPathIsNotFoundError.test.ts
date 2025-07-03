import { CurrentWorkspaceRootPathIsNotFoundError } from "../CurrentWorkspaceRootPathIsNotFoundError";
import { ERROR_CURRENT_WORKSPACE_ROOT_PATH_IS_NOT_FOUND } from "../ERROR_CURRENT_WORKSPACE_ROOT_PATH_IS_NOT_FOUND";

describe(
  "CurrentWorkspaceRootPathIsNotFoundError",
  () =>
  {
    it(
      "should create an error with the correct properties",
      () =>
      {
        const error = new CurrentWorkspaceRootPathIsNotFoundError();

        expect(error.name).toBe(ERROR_CURRENT_WORKSPACE_ROOT_PATH_IS_NOT_FOUND);
        expect(error.message).toBe("Current workspace root path is not found");
      },
    );
  },
);
