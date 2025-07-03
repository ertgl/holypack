import type { Optional } from "../object/Optional";
import type { Duration } from "../time/Duration";

import type { Mutex } from "./Mutex";
import { mutexLockSync } from "./mutexLockSync";
import { mutexUnlock } from "./mutexUnlock";

export function withMutexSync<T>(
  mutex: Mutex,
  f: () => T,
  timeout?: Optional<Duration>,
): T
{
  mutexLockSync(
    mutex,
    timeout,
  );

  try
  {
    return f();
  }
  finally
  {
    mutexUnlock(mutex);
  }
}
