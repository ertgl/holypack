import { createMutex } from "../createMutex";
import { MutexLockTimedOutError } from "../errors/MutexLockTimedOutError";
import { mutexLockAsync } from "../mutexLockAsync";

describe(
  "mutexLockAsync",
  () =>
  {
    it(
      "should throw `MutexLockTimedOutError` on timeout",
      async () =>
      {
        const mutex = createMutex();

        await mutexLockAsync(mutex);

        await expect(
          mutexLockAsync(
            mutex,
            100,
          ),
        ).rejects.toThrow(
          MutexLockTimedOutError,
        );
      },
    );
  },
);
