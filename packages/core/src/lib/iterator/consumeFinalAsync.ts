export async function consumeFinalAsync<T>(
  iterable: AsyncIterable<T> | Iterable<T>,
): Promise<T | undefined>
{
  let lastValue: T | undefined;

  if (Symbol.asyncIterator in iterable)
  {
    for await (const value of iterable)
    {
      lastValue = value;
    }
  }
  else
  {
    for (const value of iterable)
    {
      lastValue = value;
    }
  }

  return lastValue;
}
