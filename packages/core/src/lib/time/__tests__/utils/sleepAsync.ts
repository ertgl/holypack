import type { Duration } from "../../Duration";

export async function sleepAsync(
  duration: Duration,
): Promise<void>
{
  await new Promise(
    (resolve) =>
    {
      setTimeout(
        resolve,
        duration,
      );
    },
  );
}
