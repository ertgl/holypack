import { createMutex } from "../createMutex";
import { MutexLockTimedOutError } from "../errors/MutexLockTimedOutError";
import { mutexLockAsync } from "../mutexLockAsync";
import { mutexUnlock } from "../mutexUnlock";

describe(
  "mutexUnlock",
  () =>
  {
    it(
      "should release lock",
      async () =>
      {
        const mutex = createMutex();

        await mutexLockAsync(mutex);
        mutexUnlock(mutex);

        await expect(
          mutexLockAsync(
            mutex,
            100,
          ),
        ).resolves.not.toThrow(
          MutexLockTimedOutError,
        );
      },
    );
  },
);
