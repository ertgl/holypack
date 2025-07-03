import type { Optional } from "../object/Optional";
import { maybeAwait } from "../promise/maybeAwait";
import type { Duration } from "../time/Duration";

import { MutexLockTimedOutError } from "./errors/MutexLockTimedOutError";
import type { Mutex } from "./Mutex";

export async function mutexLockAsync(
  mutex: Mutex,
  timeout?: Optional<Duration>,
): Promise<void>
{
  timeout ??= Infinity;

  const startDate = Date.now();

  let remainingTime = timeout;

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  while (true)
  {
    const previousValue = Atomics.compareExchange(
      mutex.bytes,
      0,
      0,
      1,
    );

    const isLocked = previousValue === 0;

    if (isLocked)
    {
      return;
    }

    const result = Atomics.waitAsync(
      mutex.bytes,
      0,
      1,
      timeout,
    );

    const resultValue = (
      result.async
        ? await maybeAwait(result.value)
        : result.value
    );

    if (resultValue === "timed-out")
    {
      throw new MutexLockTimedOutError();
    }

    const elapsedTime = Date.now() - startDate;
    remainingTime = timeout - elapsedTime;

    if (remainingTime <= 0)
    {
      throw new MutexLockTimedOutError();
    }
  }
}
