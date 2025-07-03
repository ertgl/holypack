import { CurrentProjectRootPathIsNotFoundError } from "../CurrentProjectRootPathIsNotFoundError";
import { ERROR_CURRENT_PROJECT_ROOT_PATH_IS_NOT_FOUND } from "../ERROR_CURRENT_PROJECT_ROOT_PATH_IS_NOT_FOUND";

describe(
  "CurrentProjectRootPathIsNotFoundError",
  () =>
  {
    it(
      "should create an error with the correct properties",
      () =>
      {
        const error = new CurrentProjectRootPathIsNotFoundError();

        expect(error.name).toBe(ERROR_CURRENT_PROJECT_ROOT_PATH_IS_NOT_FOUND);
        expect(error.message).toBe("Current project root path is not found");
      },
    );
  },
);
