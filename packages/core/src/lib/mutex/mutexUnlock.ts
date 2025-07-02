import type { Mutex } from "./Mutex";

export function mutexUnlock(
  mutex: Mutex,
): void
{
  Atomics.store(
    mutex.bytes,
    0,
    0,
  );

  Atomics.notify(
    mutex.bytes,
    0,
    1,
  );
}
