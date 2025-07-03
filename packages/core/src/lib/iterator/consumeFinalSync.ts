export function consumeFinalSync<T>(
  iterable: Iterable<T>,
): T | undefined
{
  let lastValue: T | undefined;

  for (const value of iterable)
  {
    lastValue = value;
  }

  return lastValue;
}
