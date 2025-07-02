import type { Optional } from "../object/Optional";
import { maybeAwait } from "../promise/maybeAwait";
import type { MaybePromise } from "../promise/MaybePromise";
import type { Duration } from "../time/Duration";

import type { Mutex } from "./Mutex";
import { mutexLockAsync } from "./mutexLockAsync";
import { mutexUnlock } from "./mutexUnlock";

export async function withMutexAsync<T>(
  mutex: Mutex,
  f: () => MaybePromise<T>,
  timeout?: Optional<Duration>,
): Promise<T>
{
  await mutexLockAsync(
    mutex,
    timeout,
  );

  try
  {
    return await maybeAwait(f());
  }
  finally
  {
    mutexUnlock(mutex);
  }
}
