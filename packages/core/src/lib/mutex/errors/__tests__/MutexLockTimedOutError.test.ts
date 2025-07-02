import { ERROR_MUTEX_LOCK_TIMED_OUT } from "../ERROR_MUTEX_LOCK_TIMED_OUT";
import { MutexLockTimedOutError } from "../MutexLockTimedOutError";

describe(
  "MutexLockTimedOutError",
  () =>
  {
    it(
      "should create an error with the correct properties",
      () =>
      {
        const error = new MutexLockTimedOutError();

        expect(error.name).toBe(ERROR_MUTEX_LOCK_TIMED_OUT);
        expect(error.message).toBe("Mutex lock timed out");
      },
    );
  },
);
