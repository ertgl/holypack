import type { Mutex } from "./Mutex";

export function createMutex(): Mutex
{
  const buffer = new SharedArrayBuffer(4);
  const bytes = new Int32Array(buffer);

  bytes[0] = 0;

  return {
    buffer,
    bytes,
  };
}
