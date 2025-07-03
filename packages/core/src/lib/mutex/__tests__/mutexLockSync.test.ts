import { createMutex } from "../createMutex";
import { MutexLockTimedOutError } from "../errors/MutexLockTimedOutError";
import { mutexLockSync } from "../mutexLockSync";

describe(
  "mutexLockSync",
  () =>
  {
    it(
      "should throw `MutexLockTimedOutError` on timeout",
      () =>
      {
        const mutex = createMutex();

        mutexLockSync(mutex);

        expect(
          () =>
          {
            mutexLockSync(
              mutex,
              100,
            );
          },
        ).toThrow(
          MutexLockTimedOutError,
        );
      },
    );
  },
);
